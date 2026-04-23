import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Readable } from 'stream';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- RELAY DE EMISORA (PLAN B) ---
app.get('/api/radio/live', async (_req: Request, res: Response) => {
  const sourceUrl = process.env.RADIO_SOURCE_URL;
  const sourceUser = process.env.RADIO_SOURCE_USERNAME;
  const sourcePassword = process.env.RADIO_SOURCE_PASSWORD;

  if (!sourceUrl || !sourceUser || !sourcePassword) {
    return res.status(503).json({
      error: 'Relay no configurado',
      detalle: 'Faltan RADIO_SOURCE_URL, RADIO_SOURCE_USERNAME o RADIO_SOURCE_PASSWORD en el servidor',
    });
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 8000);

  try {
    const basicAuth = Buffer.from(`${sourceUser}:${sourcePassword}`).toString('base64');
    const upstreamResponse = await fetch(sourceUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        Accept: 'audio/aac,audio/mpeg,*/*',
        'User-Agent': 'IED-Kennedy-RadioRelay/1.0',
      },
      redirect: 'follow',
      signal: abortController.signal,
    });

    clearTimeout(timeout);

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      return res.status(502).json({
        error: 'No se pudo conectar a la emisora',
        status: upstreamResponse.status,
      });
    }

    const contentType = upstreamResponse.headers.get('content-type') || 'audio/mpeg';

    res.status(200);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Accel-Buffering', 'no');

    const nodeStream = Readable.fromWeb(upstreamResponse.body as any);

    res.on('close', () => {
      nodeStream.destroy();
    });

    nodeStream.on('error', () => {
      if (!res.headersSent) {
        res.status(502).end();
      } else {
        res.end();
      }
    });

    nodeStream.pipe(res);
  } catch (error) {
    clearTimeout(timeout);
    const mensaje = error instanceof Error ? error.message : 'Error desconocido';
    return res.status(502).json({
      error: 'Error en relay de radio',
      detalle: mensaje,
    });
  }
});

// --- 1. UTILIDADES ---
const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

// --- 2. DATA INDEXABLE (Secciones fijas para el Chatbot) ---
const contenidoIndexable = [
  { pagina: 'home', ruta: '/', titulo: 'Inicio', palabras_clave: ['inicio', 'home', 'principal'], descripcion: 'Página principal' },
  { pagina: 'nosotros', ruta: '/nosotros', titulo: 'Institución', palabras_clave: ['mision', 'vision', 'nosotros', 'manual', 'pei'], descripcion: 'Información institucional' },
  { pagina: 'comunicados', ruta: '/comunicados', titulo: 'Comunicados', palabras_clave: ['circulares', 'noticias', 'avisos'], descripcion: 'Últimas noticias y circulares' },
  { pagina: 'galeria', ruta: '/galeria', titulo: 'Galería', palabras_clave: ['fotos', 'imagenes', 'albumes', 'eventos'], descripcion: 'Galería fotográfica y recuerdos' },
  { pagina: 'admisiones', ruta: '/admisiones', titulo: 'Admisiones', palabras_clave: ['matricula', 'inscripcion', 'cupos', 'costos'], descripcion: 'Proceso de admisión 2026' },
  { pagina: 'contacto', ruta: '/contacto', titulo: 'Contacto', palabras_clave: ['telefono', 'ubicacion', 'mensaje', 'correo'], descripcion: 'Contacto y atención a padres' }
];

// --- 3. RUTAS DE COMUNICADOS ---
app.get('/api/comunicados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comunicados ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: "Error al obtener comunicados" }); }
});

app.post('/api/comunicados', async (req, res) => {
  const { titulo, categoria, importancia, resumen, adjunto_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comunicados (titulo, categoria, importancia, resumen, adjunto_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titulo, categoria, importancia, resumen, adjunto_url]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).send("Error"); }
});

app.delete('/api/comunicados/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM comunicados WHERE id = $1', [req.params.id]);
    res.json({ message: "Comunicado eliminado" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar" }); }
});

// --- 4. RUTAS DE GALERÍA (Álbumes y Fotos) ---
app.get('/api/albumes', async (req, res) => {
  try {
    const query = `
      SELECT
        a.id,
        a.titulo,
        a.fecha_creacion,
        CASE
          WHEN a.portada_url IS NOT NULL
            AND BTRIM(a.portada_url) <> ''
            AND EXISTS (
              SELECT 1
              FROM fotos fp
              WHERE fp.album_id = a.id
                AND fp.url = a.portada_url
            )
          THEN a.portada_url
          ELSE (
            SELECT f1.url
            FROM fotos f1
            WHERE f1.album_id = a.id
            ORDER BY f1.id ASC
            LIMIT 1
          )
        END AS portada_url,
        COUNT(f.id) AS cantidad_fotos
      FROM albumes a
      LEFT JOIN fotos f ON a.id = f.album_id
      GROUP BY a.id
      ORDER BY a.fecha_creacion DESC`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: "Error en galería" }); }
});

app.post('/api/albumes', async (req, res) => {
  const { titulo, portada_url } = req.body;
  try {
    const result = await pool.query("INSERT INTO albumes (titulo, portada_url) VALUES ($1, $2) RETURNING *", [titulo, portada_url]);
    res.json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error al crear álbum" }); }
});

app.delete('/api/albumes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM albumes WHERE id = $1', [req.params.id]);
    res.json({ message: "Álbum eliminado" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar álbum" }); }
});

app.get('/api/albumes/:id/fotos', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fotos WHERE album_id = $1 ORDER BY id ASC", [req.params.id]);
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: "Error en fotos" }); }
});

app.post('/api/albumes/:id/fotos', async (req, res) => {
  const { url } = req.body;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('SELECT id FROM albumes WHERE id = $1 FOR UPDATE', [req.params.id]);

      const cantidadFotosPrevias = await client.query(
        'SELECT COUNT(*)::int AS total FROM fotos WHERE album_id = $1',
        [req.params.id]
      );
      const esPrimeraFoto = cantidadFotosPrevias.rows[0]?.total === 0;

      const result = await client.query(
        "INSERT INTO fotos (album_id, url) VALUES ($1, $2) RETURNING *",
        [req.params.id, url]
      );

      if (esPrimeraFoto) {
        await client.query(
          'UPDATE albumes SET portada_url = $2 WHERE id = $1',
          [req.params.id, url]
        );
      }

      await client.query('COMMIT');
      res.json(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) { res.status(500).json({ error: "Error al guardar foto" }); }
});

// --- 5. RUTAS DE ADMISIONES ---
app.get('/api/admisiones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admisiones ORDER BY fecha_solicitud DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: 'Error en la base de datos' }); }
});

app.post('/api/admisiones', async (req, res) => {
  const { nombre_acudiente, correo, grado_postula, mensaje } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO admisiones (nombre_acudiente, correo, grado_postula, mensaje) VALUES ($1, $2, $3, $4) RETURNING *", 
      [nombre_acudiente, correo, grado_postula, mensaje]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/admisiones/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM admisiones WHERE id = $1', [req.params.id]);
    res.json({ message: "Admisión eliminada" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar" }); }
});

// --- 6. RUTAS DE CONTACTO ---
app.get('/api/contacto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: 'Error en la base de datos' }); }
});

app.post('/api/contacto', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje) VALUES ($1, $2, $3, $4) RETURNING *", 
      [nombre, correo, asunto, mensaje]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/contacto/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM mensajes_contacto WHERE id = $1', [req.params.id]);
    res.json({ message: "Mensaje eliminado" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar" }); }
});

// --- 7. RUTAS DE BLOG ---
app.get('/api/blog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: "Error al obtener entradas del blog" }); }
});

app.post('/api/blog', async (req, res) => {
  const { titulo, categoria, contenido, imagen_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO blog (titulo, categoria, contenido, imagen_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, categoria, contenido, imagen_url || null]
    );
    res.json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error al crear entrada" }); }
});

app.delete('/api/blog/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM blog WHERE id = $1', [req.params.id]);
    res.json({ message: "Entrada eliminada" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar entrada" }); }
});

// --- 8. BUSCADOR CHATBOT UNIFICADO ---
app.get('/api/chatbot/buscar', async (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.json([]);
  }

  const queryLimpio = normalizarTexto(q);
  const dbTerm = `%${queryLimpio}%`;

  try {
    // A. Buscar en Secciones del Sitio (Fijas)
    const paginas = contenidoIndexable
      .filter(item => 
        normalizarTexto(item.titulo).includes(queryLimpio) || 
        item.palabras_clave.some(kw => normalizarTexto(kw).includes(queryLimpio))
      )
      .map(item => ({ 
        id: item.pagina, 
        tipo: 'pagina', 
        titulo: item.titulo, 
        descripcion: item.descripcion, 
        url: item.ruta 
      }));

    // B. Buscar Documentos Institucionales
    const docsRef: Record<string, string> = { 
      'manual': 'manual-convivencia.pdf', 
      'horario': 'horarios.pdf', 
      'pei': 'pei.pdf', 
      'cronograma': 'cronograma.pdf'
    };
    
    let documentos = [];
    for (let key in docsRef) {
      if (queryLimpio.includes(key)) {
        documentos.push({
          id: key,
          tipo: 'institucional',
          titulo: `Documento ${key.toUpperCase()}`,
          descripcion: `Consultar archivo oficial de ${key}`,
          url: `/docs/${docsRef[key]}`,
          es_documento: true
        });
      }
    }

    // C. Buscar en la Base de Datos (Comunicados)
    const dbRes = await pool.query(
      `SELECT id, titulo, resumen as descripcion, '/comunicados' as url, 'comunicado' as tipo 
       FROM comunicados 
       WHERE LOWER(titulo) ILIKE $1 OR LOWER(resumen) ILIKE $1 
       LIMIT 3`, [dbTerm]
    );

    // Combinar y enviar
    res.json([...paginas, ...documentos, ...dbRes.rows]);

  } catch (error) {
    console.error("Error en búsqueda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// --- 8. INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en puerto ${PORT}`);
});