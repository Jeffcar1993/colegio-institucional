import { Shield, Flag, Music, Award } from "lucide-react";
import escudoImg from '../assets/escudo.jpeg';
import banderaImg from '../assets/bandera.png';

const SimbolosInstitucionales = () => {
  const simbolos = [
    {
      titulo: "Escudo",
      icono: Shield,
      descripcion: "El escudo del Colegio Kennedy representa nuestros valores fundamentales: la excelencia académica, el compromiso con la comunidad rural y nuestra tradición de más de 130 años.",
      significado: [
        "Los colores verde y blanco simbolizan la esperanza y la pureza",
        "El libro abierto representa el conocimiento y la sabiduría",
        "Las espigas de trigo simbolizan la agricultura y nuestro contexto rural"
      ],
      imagen: escudoImg,
      color: "bg-green-50"
    },
    {
      titulo: "Bandera",
      icono: Flag,
      descripcion: "Nuestra bandera institucional ondea con orgullo en cada sede, representando la unidad de nuestra comunidad educativa.",
      significado: [
        "Franja verde: Representa el campo, la naturaleza y el crecimiento",
        "Franja blanca: Simboliza la paz, la pureza y la transparencia",
        "Escudo central: Nuestra identidad y tradición institucional"
      ],
      imagen: banderaImg,
      color: "bg-blue-50"
    },
    {
      titulo: "Himno",
      icono: Music,
      descripcion: "El himno del Colegio Kennedy es un canto a nuestra historia, nuestros valores y el compromiso con la formación integral.",
      significado: [
        "Estrofas que exaltan nuestro legado y la identidad sanpedruna",
        "Coro que invita a la unidad y el orgullo por la ciencia y virtud",
        "Versos que celebran el conocimiento, la juventud y el saber"
      ],
      letra: `CORO
SAN PEDRUNOS CANTAD AL COLEGIO
DONDE SE IMPARTE LA CIENCIA Y VIRTUD
Y FLORECEN EN ÉL COMO ROSAS
LOS ANHELOS DE LA JUVENTUD

I
MAJESTUOSO SE YERGUE TRIUNFANTE
CONQUISTANDO LA SELVA FERAZ
QUE DEL GUAVIO LA TIERRA RECUBRE
CON EL RITMO DEL ALEGRE CANTAR

II
EN SUS AULAS SE NUTREN LAS MENTES
Y SE APRENDE LA DUDA A VENCER
SE EJERCITAN EL ALMA Y EL CUERPO
SE ACRECIENTA DEL JOVEN EL SER

CORO
SAN PEDRUNOS CANTAD AL COLEGIO
DO SE IMPARTE LA CIENCIA Y VIRTUD
Y FLORECEN EN ÉL COMO ROSAS
LOS ANHELOS DE LA JUVENTUD

III
SAN PEDRUNOS CANTAD JUBILOSOS
AL COLEGIO QUE OS DA BIENESTAR
QUE RESURJA DEL ALMA LA DICHA
DE SABER CADA VEZ MÁS Y MÁS

IV
PROFESORES CUMPLID VUESTRA META
CON CONSTANCIA SIN NUNCA CEJAR
QUE NO HAY PRECIO EN LA VIDA MAS GRANDE
QUE LA LUZ EN LAS MENTES SEMBRAR

CORO
SAN PEDRUNOS CANTAD AL COLEGIO
DO SE IMPARTE LA CIENCIA Y VIRTUD
Y FLORECEN EN ÉL COMO ROSAS
LOS ANHELOS DE LA JUVENTUD

V
Y LA HERENCIA DE PADRES A HIJOS
NO ES DINERO DE EXISTENCIA FUGAZ
SINO AQUELLO QUE EN LA VIDA PERDURA
PUES EL SABER NO SE ACABA JAMÁS.`,
      color: "bg-amber-50"
    },
    {
      titulo: "Valores Institucionales",
      icono: Award,
      descripcion: "Los valores que definen nuestra comunidad educativa y guían nuestro quehacer diario.",
      significado: [
        "Respeto: Base de la convivencia armónica",
        "Responsabilidad: Compromiso con nuestro aprendizaje y entorno",
        "Solidaridad: Apoyo mutuo en la comunidad educativa",
        "Honestidad: Transparencia en todas nuestras acciones",
        "Excelencia: Búsqueda constante de la calidad educativa"
      ],
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="bg-green-800 text-white py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Símbolos Institucionales</h1>
        <p className="mt-2 text-green-100">Nuestra identidad y tradición desde 1890</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 space-y-8">
        {simbolos.map((simbolo, index) => (
          <div 
            key={index} 
            className={`${simbolo.color} rounded-2xl p-8 shadow-lg border border-gray-200`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <simbolo.icono className="text-green-700" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{simbolo.titulo}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">{simbolo.descripcion}</p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-800">Significado:</h3>
                  <ul className="space-y-2">
                    {simbolo.significado.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {simbolo.letra && (
                  <div className="mt-4 bg-white/60 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-800 mb-2">Letra del Himno:</h3>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-serif">
                      {simbolo.letra}
                    </pre>
                  </div>
                )}
              </div>

              {simbolo.imagen && (
                <div className="flex items-center justify-center">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <img 
                      src={simbolo.imagen} 
                      alt={simbolo.titulo}
                      className="max-h-64 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x300?text=" + simbolo.titulo;
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimbolosInstitucionales;
