import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const DocumentosInstitucionales = () => {
  const documentos = [
    { nombre: "Manual de Convivencia", url: "/docs/manual-convivencia.pdf" },
    { nombre: "Horizonte institucional", url: "/docs/pei.pdf" },
    { nombre: "Cronograma de Actividades 2026", url: "/docs/cronograma.pdf" },
    { nombre: "Horario de Clases", url: "/docs/horarios.pdf" },
  ];

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="bg-green-800 text-white py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Documentos Institucionales</h1>
        <p className="mt-2 text-green-100">Información oficial y normatividad del colegio</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-xl shadow-lg border p-6">
          <ul className="divide-y divide-slate-100">
            {documentos.map((doc, index) => (
              <li 
                key={index} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-slate-50 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-3 rounded-lg text-red-600">
                    <FileText size={28} />
                  </div>
                  <span className="font-semibold text-slate-700 text-lg">
                    {doc.nombre}
                  </span>
                </div>

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
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-blue-800 text-sm">
            <strong>Nota:</strong> Todos los documentos están en formato PDF. 
            Si no puede visualizarlos, asegúrese de tener instalado un lector de PDF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentosInstitucionales;
