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

app.get('/api/comunicados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comunicados ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener comunicados' });
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor TS corriendo en http://localhost:${PORT}`);
});