// Configuración de la emisora en vivo
// Esta URL será proporcionada por caster.fm o generada por BUTT

export const RADIO_CONFIG = {
  // URL del stream que consume el frontend.
  // Recomendado: usar el relay local del backend para evitar prompts de autenticación.
  streamUrl: import.meta.env.VITE_STREAM_URL || 'http://localhost:5000/api/radio/live',
  
  // Nombre de la emisora
  stationName: 'Emisora Colegio Kennedy',
  
  // Descripción corta para UI
  description: 'Programacion institucional en directo',
  
  // Timeout de conexión (en milisegundos)
  connectionTimeout: 5000,
};

export default RADIO_CONFIG;
