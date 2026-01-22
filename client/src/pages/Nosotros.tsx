import { Button } from "@/components/ui/button";
import { FileText} from "lucide-react"; // Iconos para los botones

const Nosotros = () => {
  // Datos de los documentos para no repetir código
  const documentos = [
    { nombre: "Manual de Convivencia", url: "/docs/manual-convivencia.pdf" },
    { nombre: "Proyecto Educativo Institucional (PEI)", url: "/docs/pei.pdf" },
    { nombre: "Cronograma de Actividades 2026", url: "/docs/cronograma.pdf" },
    { nombre: "Horario de Clases", url: "/docs/horarios.pdf" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      
      {/* Sección Principal - Encabezado */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-green-900 tracking-tight">
          Nuestra Institución
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto italic">
          "Fundado en 1890, IED Colegio Kennedy de San Pedro de Jagua"
        </p>
      </section>

      {/* Sección Misión y Visión - Grid para mejor lectura */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-600 space-y-3">
          <h2 className="text-2xl font-bold text-green-800">Misión</h2>
          <p className="text-slate-600 leading-relaxed">
            Formar personas integrales con valores cristianos, preparadas para enfrentar los retos del siglo XXI, fomentando el liderazgo y la ética en cada estudiante.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-900 space-y-3">
          <h2 className="text-2xl font-bold text-blue-900">Visión</h2>
          <p className="text-slate-600 leading-relaxed">
            Ser una institución educativa líder en la región, reconocida por su excelencia académica, compromiso social y la implementación de tecnologías innovadoras.
          </p>
        </div>
      </section>

      {/* Sección de Documentos Institucionales */}
<section className="space-y-6">
  <h3 className="text-3xl font-bold text-slate-800 border-b pb-2">
    Documentos Institucionales
  </h3>
  
  <div className="bg-white rounded-xl shadow-inner border p-2">
    <ul className="divide-y divide-slate-100">
      {documentos.map((doc, index) => (
        <li 
          key={index} 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-slate-50 transition-colors gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-lg text-red-600">
              <FileText size={24} />
            </div>
            <span className="font-semibold text-slate-700 text-lg">
              {doc.nombre}
            </span>
          </div>

          <div className="flex gap-2"> {/* Contenedor para botones si quisieras agregar más */}
            <Button 
              asChild 
              variant="outline" 
              className="border-green-700 text-green-700 hover:bg-green-50 gap-2"
            >
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FileText size={16} />
                Ver Documento
              </a>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

    </div>
  );
};

export default Nosotros;