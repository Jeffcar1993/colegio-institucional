import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. UTILIDADES ---
const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

// --- 2. DATA INDEXABLE ---
const contenidoIndexable = [
  { pagina: 'home', ruta: '/', titulo: 'Inicio', palabras_clave: ['inicio', 'home', 'principal'], descripcion: 'Página principal' },
  { pagina: 'nosotros', ruta: '/nosotros', titulo: 'Institución', palabras_clave: ['mision', 'vision', 'nosotros', 'manual', 'pei'], descripcion: 'Información institucional' },
  { pagina: 'comunicados', ruta: '/comunicados', titulo: 'Comunicados', palabras_clave: ['circulares', 'noticias', 'avisos'], descripcion: 'Últimas noticias' },
  { pagina: 'galeria', ruta: '/galeria', titulo: 'Galería', palabras_clave: ['fotos', 'imagenes', 'albumes'], descripcion: 'Galería fotográfica' },
  { pagina: 'admisiones', ruta: '/admisiones', titulo: 'Admisiones', palabras_clave: ['matricula', 'inscripcion', 'cupos'], descripcion: 'Proceso de admisión' },
  { pagina: 'contacto', ruta: '/contacto', titulo: 'Contacto', palabras_clave: ['telefono', 'ubicacion', 'mensaje'], descripcion: 'Contacto y secretaría' }
];

// --- 3. RUTAS DE COMUNICADOS (Lectura, Escritura, Borrado) ---
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
      SELECT a.*, COUNT(f.id) as cantidad_fotos 
      FROM albumes a LEFT JOIN fotos f ON a.id = f.album_id 
      GROUP BY a.id ORDER BY a.fecha_creacion DESC`;
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
    const result = await pool.query("INSERT INTO fotos (album_id, url) VALUES ($1, $2) RETURNING *", [req.params.id, url]);
    res.json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error al guardar foto" }); }
});

// --- 5. RUTAS DE ADMISIONES (Panel y Formulario) ---
app.get('/api/admisiones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admisiones ORDER BY fecha_solicitud DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: 'Error en la base de datos' }); }
});

app.post('/api/admisiones', async (req, res) => {
  const { nombre_acudiente, correo, grado_postula, mensaje } = req.body;
  try {
    const result = await pool.query("INSERT INTO admisiones (nombre_acudiente, correo, grado_postula, mensaje) VALUES ($1, $2, $3, $4) RETURNING *", [nombre_acudiente, correo, grado_postula, mensaje]);
    res.status(201).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/admisiones/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM admisiones WHERE id = $1', [req.params.id]);
    res.json({ message: "Admisión eliminada" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar" }); }
});

// --- 6. RUTAS DE CONTACTO (Panel y Formulario) ---
app.get('/api/contacto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: 'Error en la base de datos' }); }
});

app.post('/api/contacto', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;
  try {
    const result = await pool.query("INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje) VALUES ($1, $2, $3, $4) RETURNING *", [nombre, correo, asunto, mensaje]);
    res.status(201).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/contacto/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM mensajes_contacto WHERE id = $1', [req.params.id]);
    res.json({ message: "Mensaje eliminado" });
  } catch (error) { res.status(500).json({ error: "Error al eliminar" }); }
});

// --- 7. BUSCADOR CHATBOT ---
app.get('/api/chatbot/buscar', async (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string') return res.status(400).json([]);
  const queryLimpio = normalizarTexto(q);
  const sqlQuery = `%${q.toLowerCase()}%`;
  try {
    const comunicados = await pool.query(
      `SELECT 'comunicado' as tipo, id, titulo, resumen as descripcion, adjunto_url as url, fecha_creacion as fecha 
       FROM comunicados WHERE LOWER(titulo) ILIKE $1 OR LOWER(resumen) ILIKE $1 LIMIT 5`, [sqlQuery]
    );
    const paginas = contenidoIndexable.filter(item => 
      normalizarTexto(item.titulo).includes(queryLimpio) || 
      item.palabras_clave.some(kw => normalizarTexto(kw).includes(queryLimpio))
    ).map(item => ({ tipo: 'pagina', id: item.pagina, titulo: item.titulo, descripcion: item.descripcion, url: item.ruta, fecha: new Date().toISOString() }));
    const docsRef: any = { 'manual': 'manual-convivencia.pdf', 'horario': 'horarios.pdf', 'mision': 'mision.pdf' };
    let docs = [];
    for (let key in docsRef) { if (queryLimpio.includes(key)) { docs.push({ tipo: 'institucional', id: key, titulo: `Documento ${key.toUpperCase()}`, url: `/docs/${docsRef[key]}`, es_documento: true }); } }
    res.json([...paginas, ...docs, ...comunicados.rows]);
  } catch (err) { res.status(500).json([]); }
});

// --- INICIO ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor listo en puerto ${PORT}`));