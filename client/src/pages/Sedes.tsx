// src/pages/Sedes.tsx
import { MapPin, Users, Clock } from 'lucide-react';

const Sedes = () => {
  const sedes = [
    {
      nombre: "Sede Principal (Bachillerato)",
      direccion: "San Pedro de Jagua - Centro",
      jornada: "Mañana y Tarde",
      estudiantes: "600 aprox.",
      imagen: "./img/sede-bachillerato.jpeg" // Imagen de ejemplo
    },
    {
      nombre: "Sede General Santander (Primaria)",
      direccion: "San Pedro de Jagua - Barrio General Santander",
      jornada: "Mañana",
      estudiantes: "350 aprox.",
      imagen: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500"
    },
    {
      nombre: "Sede La Romaza (Primaria)",
      direccion: "San Pedro de Jagua - vereda La Romaza",
      jornada: "Mañana",
      estudiantes: "350 aprox.",
      imagen: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500"
    },
    {
      nombre: "Sede Soya (Primaria)",
      direccion: "San Pedro de Jagua - vereda Soya",
      jornada: "Mañana",
      estudiantes: "350 aprox.",
      imagen: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500"
    },
    {
      nombre: "Sede Gazajujo (Primaria)",
      direccion: "San Pedro de Jagua - vereda Gazajujo",
      jornada: "Mañana",
      estudiantes: "350 aprox.",
      imagen: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500"
    },
    {
      nombre: "Sede Gibraltar (Primaria)",
      direccion: "San Pedro de Jagua - vereda Gibraltar",
      jornada: "Mañana",
      estudiantes: "350 aprox.",
      imagen: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-slate-900 text-white py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Nuestras Sedes</h1>
        <p className="mt-2 text-slate-400">Espacios diseñados para el aprendizaje y la convivencia</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sedes.map((sede, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md flex flex-col">
              <img src={sede.imagen} alt={sede.nombre} className="h-48 w-full object-cover" />
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">{sede.nombre}</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={20} className="text-green-600" />
                    <span>{sede.direccion}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock size={20} className="text-green-600" />
                    <span>Jornada: {sede.jornada}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Users size={20} className="text-green-600" />
                    <span>Capacidad: {sede.estudiantes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sedes;