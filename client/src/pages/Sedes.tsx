// src/pages/Sedes.tsx
import { MapPin, Clock } from 'lucide-react';

const Sedes = () => {
  const sedes = [
    {
      nombre: "Sede Kennedy",
      imagen: "/img/sede-principal.jpeg"
    },
    {
      nombre: "Sede General Santander",
      imagen: "/img/general-santander.jpeg"
    },
    {
      nombre: "Sede Romaza",
      imagen: "/img/romaza.jpeg"
    },
    {
      nombre: "Sede Gazajujo",
      imagen: "/img/gazajujo.png"
    },
    {
      nombre: "Sede Soya",
      imagen: "/img/soya.jpeg"
    },
    {
      nombre: "Sede Gibraltar",
      imagen: "/img/gibraltar.jpeg"
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
                    <span>San Pedro de Jagua, Ubalá, Cundinamarca</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock size={20} className="text-green-600" />
                    <span>Jornada única</span>
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