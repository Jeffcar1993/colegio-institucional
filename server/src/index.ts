import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js'; // Nota el .js al final, es necesario en NodeNext

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor IED Kennedy en TypeScript listo 🚀');
});

// Busca la ruta app.post('/api/comunicados', ...) y asegúrate de que incluya adjunto_url
app.post('/api/comunicados', async (req, res) => {
  const { titulo, categoria, importancia, resumen, adjunto_url } = req.body;
  try {
    const nuevoComunicado = await pool.query(
      "INSERT INTO comunicados (titulo, categoria, importancia, resumen, adjunto_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titulo, categoria, importancia, resumen, adjunto_url]
    );
    res.json(nuevoComunicado.rows[0]);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

// Obtener todos los comunicados (para mostrarlos en la web)
app.get('/api/comunicados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comunicados ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comunicados" });
  }
});

// Obtener admisiones con el nombre de columna correcto
app.get('/api/admisiones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admisiones ORDER BY fecha_solicitud DESC');
    res.json(result.rows);
  } catch (error) {
    console.error("Error SQL en admisiones:", error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Obtener mensajes de contacto
app.get('/api/contacto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC');
    res.json(result.rows);
  } catch (error) {
    console.error("Error SQL en contacto:", error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Ruta para recibir admisiones
app.post('/api/admisiones', async (req, res) => {
  const { nombre_acudiente, correo, grado_postula, mensaje } = req.body;

  try {
    const query = `
      INSERT INTO admisiones (nombre_acudiente, correo, grado_postula, mensaje)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [nombre_acudiente, correo, grado_postula, mensaje];
    const result = await pool.query(query, values);

    res.status(201).json({ 
      message: 'Admisión registrada con éxito', 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error al guardar admisión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para recibir mensajes de contacto
app.post('/api/contacto', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  try {
    const query = `
      INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [nombre, correo, asunto, mensaje];
    const result = await pool.query(query, values);

    res.status(201).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente', 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error al guardar mensaje de contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar una Admisión
app.delete('/api/admisiones/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM admisiones WHERE id = $1', [req.params.id]);
    res.json({ message: "Admisión eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

// Eliminar un Mensaje de Contacto
app.delete('/api/contacto/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM mensajes_contacto WHERE id = $1', [req.params.id]);
    res.json({ message: "Mensaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

// Eliminar un Comunicado
app.delete('/api/comunicados/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM comunicados WHERE id = $1', [req.params.id]);
    res.json({ message: "Comunicado eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor TS corriendo en http://localhost:${PORT}`);
});