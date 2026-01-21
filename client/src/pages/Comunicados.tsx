import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comunicado {
  id: number;
  fecha: string;
  titulo: string;
  categoria: string;
  importancia: "default" | "secondary" | "destructive" | "outline";
  resumen: string;
}

const Comunicados = () => {
  // Datos de prueba (estos vendrán luego de la base de datos)
  const listaComunicados: Comunicado[] = [
    {
      id: 1,
      fecha: "21 Ene, 2026",
      titulo: "Inicio de clases Primer Semestre",
      categoria: "Académico",
      importancia: "default",
      resumen: "Se informa a toda la comunidad educativa que el inicio de actividades académicas será el próximo 2 de febrero a las 7:00 AM."
    },
    {
      id: 2,
      fecha: "19 Ene, 2026",
      titulo: "Circular sobre Uniformes Escolares",
      categoria: "Urgente",
      importancia: "destructive",
      resumen: "Recordamos el uso obligatorio del uniforme de gala para la ceremonia de inauguración. Consultar el manual de convivencia."
    },
    {
      id: 3,
      fecha: "15 Ene, 2026",
      titulo: "Mantenimiento de Plataforma Virtual",
      categoria: "Técnico",
      importancia: "outline",
      resumen: "La plataforma de notas estará fuera de servicio este fin de semana por actualización de servidores."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-10 border-b pb-6">
        <div className="bg-green-100 p-3 rounded-full text-green-700">
          <Bell size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Comunicados Oficiales</h1>
          <p className="text-slate-600">Información importante para padres, estudiantes y docentes.</p>
        </div>
      </div>

      <div className="space-y-6">
        {listaComunicados.map((item) => (
          <Card key={item.id} className="group hover:shadow-md transition-all border-l-4 border-l-green-600">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={item.importancia}>
                  {item.categoria}
                </Badge>
                <div className="flex items-center text-sm text-slate-500 gap-1">
                  <Calendar size={14} />
                  {item.fecha}
                </div>
              </div>
              <CardTitle className="text-xl group-hover:text-green-700 transition-colors">
                {item.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed mb-4">
                {item.resumen}
              </p>
              <Button variant="link" className="p-0 h-auto text-green-700 font-bold group">
                Leer comunicado completo <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Comunicados;