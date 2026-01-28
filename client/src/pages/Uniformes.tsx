// src/pages/Uniformes.tsx
import { ShieldCheck, Info } from 'lucide-react';

const Uniformes = () => {
  const tipos = [
    {
      nombre: "Uniforme de Diario",
      descripcion: "Uso obligatorio para jornadas académicas regulares.",
      detalles: ["Jumper a cuadros (Niñas)", "Pantalón gris (Niños)", "Camisa blanca con escudo", "Zapato de amarrar negro"],
      color: "bg-blue-50"
    },
    {
      nombre: "Uniforme de Educación Física",
      descripcion: "Uso exclusivo para actividades deportivas y lúdicas.",
      detalles: ["Sudadera institucional", "Camiseta blanca tipo polo", "Medias blancas", "Tenis totalmente blancos"],
      color: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="bg-green-800 text-white py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Uniformes Institucionales</h1>
        <p className="mt-2 text-green-100">Identidad y respeto por nuestra institución</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tipos.map((u, i) => (
            <div key={i} className={`${u.color} rounded-2xl p-8 shadow-sm border border-gray-100`}>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-green-700" size={28} />
                <h2 className="text-xl font-bold text-slate-800">{u.nombre}</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm">{u.descripcion}</p>
              <ul className="space-y-3">
                {u.detalles.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4 items-start">
          <Info className="text-amber-600 shrink-0" size={24} />
          <p className="text-amber-800 text-sm">
            Recuerde que el porte correcto del uniforme es requisito indispensable según nuestro <strong>Manual de Convivencia</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Uniformes;