import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

interface Comunicado {
  id: number;
  titulo: string;
  categoria: string;
  importancia: string;
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
        const sortedData = data.sort((a: Comunicado, b: Comunicado) => 
          new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime()
        );
        setComunicados(sortedData);
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
        <Loader2 className="h-8 w-8 animate-spin text-green-700 mb-4" />
        <p>Cargando información oficial...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-4 mb-10 border-b pb-8">
        <div className="bg-green-100 p-4 rounded-full text-green-700 shadow-sm">
          <Bell size={32} />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Comunicados Oficiales</h1>
          <p className="text-slate-500 mt-1 text-lg">IED Kennedy — 2026</p>
        </div>
      </div>

      <div className="space-y-6">
        {comunicados.length > 0 ? (
          comunicados.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all border-l-8 border-l-green-600 shadow-sm overflow-hidden border-r border-t border-b">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center mb-3">
                  <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 hover:bg-green-100 transition-colors">
                    {item.categoria}
                  </Badge>
                  <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-widest gap-2">
                    <Calendar size={14} />
                    {new Date(item.fecha_creacion).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-green-700 transition-colors leading-snug">
                  {item.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-2 text-base italic">
                  "{item.resumen}"
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="bg-green-700 hover:bg-green-800 text-white font-bold group px-6">
                      Abrir documento completo 
                      <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  
                  {/* AJUSTES DE VISIBILIDAD EN DIALOGCONTENT */}
                  <DialogContent className="w-[95vw] sm:max-w-5xl h-[90vh] flex flex-col p-0 rounded-xl shadow-2xl border-radius-lg overflow-hidden">
                    <DialogHeader className="p-6 pb-4 border-b bg-slate-50">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-green-600 text-white">{item.categoria}</Badge>
                        <span className="text-xs text-slate-400 font-mono tracking-tighter">REF-ID: {item.id}2026</span>
                      </div>
                      <DialogTitle className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                        {item.titulo}
                      </DialogTitle>
                      <DialogDescription className="text-slate-500 font-medium">
                        Publicado el {new Date(item.fecha_creacion).toLocaleDateString('es-CO', { dateStyle: 'full' })}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {/* CONTENEDOR CON SCROLL PARA EL TEXTO LARGO */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white">
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-700 text-lg leading-[1.8] whitespace-pre-wrap font-serif">
                          {item.resumen}
                        </p>
                      </div>
                      
                      <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-100 flex flex-col items-center text-center space-y-2">
                        <div className="w-16 h-1 w-24 bg-green-700 mb-4"></div>
                        <p className="font-bold text-slate-900 uppercase tracking-widest text-sm">Rectoría Institucional</p>
                        <p className="text-xs text-slate-400">IED Kennedy — Educación para el futuro</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium italic">No hay comunicados oficiales publicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}