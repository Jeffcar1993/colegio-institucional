import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Comunicado {
  id: number;
  titulo: string;
  categoria: string;
  // Ajustamos a los tipos que Shadcn espera en Badge
  importancia: 'default' | 'destructive' | 'outline' | 'secondary'; 
  resumen: string;
  fecha_creacion: string; 
}

export default function Comunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComunicados = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/comunicados");
        const data = await response.json();
        setComunicados(data);
      } catch (error) {
        console.error("Error cargando comunicados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComunicados();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mb-4"></div>
        <p>Cargando comunicados oficiales del IED Kennedy...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-10 border-b pb-6">
        <div className="bg-green-100 p-3 rounded-full text-green-700">
          <Bell size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Comunicados Oficiales</h1>
          <p className="text-slate-600">Información importante para la comunidad educativa.</p>
        </div>
      </div>

      <div className="space-y-6">
        {comunicados.length > 0 ? (
          comunicados.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-all border-l-4 border-l-green-600">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={item.importancia}>
                    {item.categoria}
                  </Badge>
                  <div className="flex items-center text-sm text-slate-500 gap-1">
                    <Calendar size={14} />
                    {new Date(item.fecha_creacion).toLocaleDateString()}
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
          ))
        ) : (
          <p className="text-center text-slate-500 italic">No hay comunicados recientes en este momento.</p>
        )}
      </div>
    </div>
  );
}