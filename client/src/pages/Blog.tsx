import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import API_BASE_URL from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Cuento {
  id: number;
  titulo: string;
  categoria: string;
  contenido: string;
  imagen_url?: string;
  fecha_creacion: string;
}

interface Copla {
  id: number;
  titulo?: string;
  autor?: string;
  descripcion?: string;
  imagen_url?: string;
  fecha_creacion: string;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Sin fecha" : date.toLocaleDateString("es-CO");
};

export default function EntreLetras() {
  const [cuentos, setCuentos] = useState<Cuento[]>([]);
  const [coplas, setCoplas] = useState<Copla[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntreLetras = async () => {
      try {
        const [cuentosResponse, coplasResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/cuentos`),
          fetch(`${API_BASE_URL}/api/coplas`),
        ]);

        const cuentosData = await cuentosResponse.json();
        const coplasData = await coplasResponse.json();

        setCuentos(Array.isArray(cuentosData) ? cuentosData : []);
        setCoplas(Array.isArray(coplasData) ? coplasData : []);
      } catch (error) {
        console.error("Error cargando Entre Letras:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntreLetras();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-green-700 mb-4" />
        <p>Cargando contenido de Entre Letras...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-4 mb-10 border-b pb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-green-700 p-4 rounded-full text-white shadow-sm">
          <BookOpen size={32} />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Entre Letras</h1>
          <p className="text-slate-500 mt-1 text-lg">Cuentos, ritmos y creatividad estudiantil</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900">Cuentos</h2>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Narrativas</Badge>
          </div>

          <div className="space-y-5">
            {cuentos.length > 0 ? (
              cuentos.map((cuento) => (
                <Card key={cuento.id} className="group border border-emerald-200 bg-white/80 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  {cuento.imagen_url && (
                    <img src={cuento.imagen_url} alt={cuento.titulo} className="w-full h-48 object-cover" loading="lazy" />
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center gap-3 mb-3">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                        {cuento.categoria || "Narrativo"}
                      </Badge>
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        <Calendar size={12} />
                        {formatDate(cuento.fecha_creacion)}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                      {cuento.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 leading-relaxed mb-5 line-clamp-3">{cuento.contenido}</p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5">
                          Leer cuento
                          <ChevronRight size={18} className="ml-2" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="w-[95vw] sm:max-w-4xl h-[90vh] sm:h-[88vh] flex flex-col p-0 rounded-xl shadow-2xl overflow-hidden border-none">
                        <DialogHeader className="p-6 pr-14 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:pt-6 border-b bg-slate-50 relative">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-emerald-600 text-white">{cuento.categoria || "Narrativo"}</Badge>
                            <span className="text-xs text-slate-400 font-mono tracking-tighter">CUENTO #{cuento.id}</span>
                          </div>
                          <DialogTitle className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                            {cuento.titulo}
                          </DialogTitle>
                          <DialogDescription className="text-slate-500 font-medium">
                            Publicado el {formatDate(cuento.fecha_creacion)}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white">
                          <div className="max-w-3xl mx-auto">
                            {cuento.imagen_url && (
                              <img
                                src={cuento.imagen_url}
                                alt={cuento.titulo}
                                className="w-full h-auto max-h-[360px] object-cover rounded-xl mb-8"
                              />
                            )}
                            <p className="text-slate-700 text-lg leading-[1.8] whitespace-pre-wrap font-serif">
                              {cuento.contenido}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-white/60 text-center py-16">
                <p className="text-emerald-700 font-medium italic">Aún no hay cuentos publicados.</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 text-amber-700 p-3 rounded-full">
                <Sparkles size={20} />
              </div>
              <h2 className="text-2xl font-bold text-amber-900">Coplas</h2>
            </div>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">Rimas</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {coplas.length > 0 ? (
              coplas.map((copla) => (
                <article key={copla.id} className="group overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm hover:shadow-md transition-all">
                  {copla.imagen_url && (
                    <img
                      src={copla.imagen_url}
                      alt={copla.titulo || "Copla"}
                      className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="p-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-amber-600 font-semibold">
                      {formatDate(copla.fecha_creacion)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-800">{copla.titulo || "Copla sin título"}</h3>
                    {copla.autor && <p className="mt-1 text-sm font-medium text-amber-700">{copla.autor}</p>}
                    {copla.descripcion && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{copla.descripcion}</p>}
                  </div>
                </article>
              ))
            ) : (
              <div className="sm:col-span-2 rounded-2xl border-2 border-dashed border-amber-200 bg-white/60 text-center py-16">
                <p className="text-amber-700 font-medium italic">Aún no hay coplas publicadas.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
