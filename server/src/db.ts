import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Verificación con tipos
pool.query('SELECT NOW()')
  .then(res => console.log('✅ Conectado a Postgres en:', res.rows[0].now))
  .catch(err => console.error('❌ Error de conexión:', err));