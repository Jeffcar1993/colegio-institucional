import { Telegraf } from 'telegraf';
import { GoogleGenAI } from '@google/genai';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Helper para reintentos con backoff exponencial
const fetchWithRetry = async (
  url: string,
  options?: any,
  maxRetries = 3
): Promise<any> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (attempt === maxRetries) {
        throw err;
      }
      const delay = 1000 * attempt;
      console.warn(`Reintentando ${url} en ${delay}ms (intento ${attempt}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
};

const startBot = async () => {
  try {
    console.log('🚀 Iniciando bot de Telegram...');
    
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const ADMIN_TELEGRAM_ID = Number(process.env.ADMIN_TELEGRAM_ID || 0);

    console.log('📋 Verificando variables de entorno...');
    if (!TELEGRAM_TOKEN) throw new Error('Missing TELEGRAM_BOT_TOKEN in env');
    if (!GEMINI_KEY) console.warn('Warning: GEMINI_API_KEY not set — image OCR will fail');
    console.log('✓ Token de Telegram OK');
    console.log(`✓ Admin ID: ${ADMIN_TELEGRAM_ID}`);

    const bot = new Telegraf(TELEGRAM_TOKEN);
    const ai = GEMINI_KEY ? new GoogleGenAI({ apiKey: GEMINI_KEY }) : null;

    const SERVER_BASE = process.env.SERVER_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

    // Configurar Cloudinary si está disponible
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const CLOUD_KEY = process.env.CLOUDINARY_API_KEY;
    const CLOUD_SECRET = process.env.CLOUDINARY_API_SECRET;
    if (CLOUD_NAME && CLOUD_KEY && CLOUD_SECRET) {
      cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUD_KEY,
        api_secret: CLOUD_SECRET,
      });
    } else {
      console.warn('Cloudinary no configurado. Los adjuntos usarán la URL de Telegram.');
    }

    bot.on('photo', async (ctx) => {
      if (!ctx.from) return;
      if (ctx.from.id !== ADMIN_TELEGRAM_ID) {
        return ctx.reply('⛔ No estás autorizado para publicar comunicados.');
      }

      await ctx.reply('⏳ Procesando la imagen y generando el comunicado...');

      try {
        if (!ai) throw new Error('GEMINI_API_KEY no configurada, no se puede procesar la imagen');

        const photo = ctx.message?.photo?.[ctx.message.photo.length - 1];
        if (!photo) throw new Error('No se encontró la foto');

        const fileUrl = await ctx.telegram.getFileLink(photo.file_id);
        const response = await fetch(fileUrl.href);
        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        const prompt = `Analiza esta imagen de un comunicado escolar.\nExtrae toda la información y devuélvela estrictamente en un objeto JSON sin bloques de código con este formato:\n{\n  "titulo": "Título breve y descriptivo",\n  "contenido_html": "<p>Contenido completo estructurado en etiquetas HTML</p>",\n  "resumen": "Resumen corto de 1 a 2 oraciones para notificaciones"\n}`;

        const aiResponse = await ai.interactions.create({
          model: 'gemini-flash-latest',
          input: [
            {
              type: 'image',
              mime_type: 'image/jpeg',
              data: imageBuffer.toString('base64'),
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        });

        const data = JSON.parse((aiResponse.output_text || '').trim() || '{}');

        const titulo = data.titulo || 'Comunicado desde Telegram';
        const contenido_html = data.contenido_html || null;
        const resumen = data.resumen || (contenido_html ? (String(contenido_html).slice(0,150) + '...') : '');
        let adjunto_url = fileUrl.href || null;

        // Crear comunicado via API (como si viniera del panel Admin)
        const payload = {
          titulo,
          categoria: 'Telegram',
          importancia: 'Normal',
          resumen,
          contenido_html,
          adjunto_url: null
        };

        let creado: any = null;
        try {
          const createRes = await fetchWithRetry(`${SERVER_BASE}/api/comunicados`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          creado = await createRes.json();
        } catch (err) {
          console.error('Error creando comunicado via API:', err);
          throw err;
        }

        // Si Cloudinary está configurado, subimos usando el id para crear un public_id ordenado
        if (CLOUD_NAME && CLOUD_KEY && CLOUD_SECRET && creado?.id) {
          try {
            const publicId = `comunicados/${creado.id}-${Date.now()}`;
            const dataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            const uploadRes = await cloudinary.uploader.upload(dataUri, {
              folder: 'comunicados',
              resource_type: 'image',
              public_id: publicId,
              overwrite: true,
            });
            adjunto_url = uploadRes.secure_url || uploadRes.url || adjunto_url;

            // Actualizar registro via API con la URL final
            try {
              await fetchWithRetry(`${SERVER_BASE}/api/comunicados/${creado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adjunto_url }),
              });
            } catch (err) {
              console.error('Error actualizando comunicado con adjunto via API:', err);
            }

            console.log('Adjunto subido a Cloudinary:', adjunto_url);
          } catch (err) {
            console.error('Error subiendo a Cloudinary, se usará URL de Telegram si aplica:', err);
          }
        }

        await ctx.reply(`✅ ¡Comunicado publicado con éxito!\n\n📌 Título: ${titulo}\n📝 Resumen: ${resumen}`);
        console.log('Comunicado publicado desde bot via API:', creado);
      } catch (error) {
        console.error('Error al procesar comunicado:', error);
        await ctx.reply('❌ Ocurrió un error al procesar la imagen o guardar el comunicado.');
      }
    });

    console.log('📱 Iniciando Telegraf bot...');
    
    // Lanzar el bot en background (polling automático)
    bot.launch().catch((err) => {
      console.error('❌ Error al lanzar bot:', err instanceof Error ? err.message : String(err));
    });
    
    // Dar tiempo para que se conecte
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('🤖 Bot de comunicados ejecutándose...');
    console.log('⏳ Esperando fotos en Telegram...');

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.stack ?? err.message : String(err);
    console.error('❌ Error en startBot:', errorMessage);
    throw err;
  }
};

startBot().catch(err => {
  console.error('💥 Fatal error launching bot:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
