import { ShieldCheck, Info } from 'lucide-react';
import diarioH1 from '../assets/diarioH1.jpeg';
import diarioH2 from '../assets/diarioH2.jpeg';
import diarioM1 from '../assets/diarioM1.jpeg';
import diarioM2 from '../assets/diarioM2.jpeg';
import fisica1 from '../assets/fisica1.png';
import fisica2 from '../assets/fisica2.png';
import fisica3 from '../assets/fisica3.png';
import fisica4 from '../assets/fisica4.png';

const Uniformes = () => {
  return (

    <div className="min-h-screen bg-white pb-12">
      <div className="bg-green-800 text-white py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Uniformes Institucionales</h1>
        <p className="mt-2 text-green-100">Identidad y respeto por nuestra institución.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 space-y-12">
        {/* UNIFORME DE DIARIO */}
        <div className="bg-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-green-700" size={32} />
            <h2 className="text-2xl font-bold text-slate-800">Uniforme de Diario</h2>
          </div>
          <p className="text-slate-600 mb-8">Uso obligatorio para jornadas académicas regulares.</p>
          {/* Grid de Imágenes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={diarioH1} 
                alt="Uniforme de Diario Hombre 1" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Hombre</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={diarioH2} 
                alt="Uniforme de Diario Hombre 2" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Hombre</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={diarioM1} 
                alt="Uniforme de Diario Mujer 1" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Mujer</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={diarioM2} 
                alt="Uniforme de Diario Mujer 2" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Mujer</p>
            </div>
          </div>
          {/* Especificaciones */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Especificaciones:</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Jumper a cuadros (Niñas)
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Pantalón gris (Niños)
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Camisa blanca con escudo
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Zapato de amarrar negro
              </li>
            </ul>
          </div>
        </div>
        {/* UNIFORME DE EDUCACIÓN FÍSICA */}
        <div className="bg-green-50 rounded-2xl p-8 shadow-lg border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-green-700" size={32} />
            <h2 className="text-2xl font-bold text-slate-800">Uniforme de Educación Física</h2>
          </div>
          <p className="text-slate-600 mb-6">Uso exclusivo para actividades deportivas y lúdicas.</p>
          {/* Grid de Imágenes Educación Física */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={fisica1} 
                alt="Uniforme Educación Física 1" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Física 1</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={fisica2} 
                alt="Uniforme Educación Física 2" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Física 2</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={fisica3} 
                alt="Uniforme Educación Física 3" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Física 3</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <img 
                src={fisica4} 
                alt="Uniforme Educación Física 4" 
                className="mx-auto h-[340px] w-auto object-contain rounded-lg mb-3"
              />
              <p className="text-center text-sm font-semibold text-slate-700">Física 4</p>
            </div>
          </div>
          {/* Especificaciones Educación Física debajo del grid */}
          <div className="bg-white rounded-xl p-6 shadow-sm mt-4">
            <h3 className="font-bold text-slate-800 mb-4">Especificaciones:</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Sudadera institucional
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Camiseta blanca tipo polo
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Medias blancas
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                Tenis totalmente blancos
              </li>
            </ul>
          </div>
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