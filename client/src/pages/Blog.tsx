import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ChevronRight, BookOpen, Sparkles, ArrowLeft } from "lucide-react";
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
  autor?: string;
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
  const navigate = useNavigate();
  const { section } = useParams();
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

  const renderCuentoCard = (cuento: Cuento, fullWidth = false) => (
    <Card
      key={cuento.id}
      className={`group border border-emerald-200 bg-white/80 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer ${fullWidth ? "w-full" : ""}`}
      onClick={() => navigate("/entre-letras/cuentos")}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate("/entre-letras/cuentos");
        }
      }}
    >
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

        {cuento.autor && (
          <p className="mb-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
            {cuento.autor}
          </p>
        )}

        <CardTitle className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight tracking-tight">
          {cuento.titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-slate-600 leading-relaxed mb-5 line-clamp-3">{cuento.contenido}</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5"
              onClick={(event) => event.stopPropagation()}
            >
              Leer cuento
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[95vw] sm:max-w-4xl h-[90vh] sm:h-[88vh] flex flex-col p-0 rounded-xl shadow-2xl overflow-hidden border-none">
            <DialogHeader className="relative border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-white px-5 pb-5 pt-5 pr-16 sm:px-7 sm:pt-7">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-emerald-600 text-white">{cuento.categoria || "Narrativo"}</Badge>
                  {cuento.autor && (
                    <span className="text-xs sm:text-sm font-semibold text-emerald-700 tracking-[0.12em] uppercase">
                      por {cuento.autor}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-[0.18em] uppercase">
                  Cuento #{cuento.id}
                </span>
              </div>

              {cuento.autor && (
                <p className="mb-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                  {cuento.autor}
                </p>
              )}

              <DialogTitle className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {cuento.titulo}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
                Publicado el {formatDate(cuento.fecha_creacion)}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white">
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
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-green-700 mb-4" />
        <p>Cargando contenido de Entre Letras...</p>
      </div>
    );
  }

  if (section === "cuentos") {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/entre-letras")}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a Entre Letras
          </Button>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{cuentos.length} cuentos</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Cuentos</h1>
          <p className="text-slate-500 mt-2 text-lg">Historias, imaginación y creatividad estudiantil.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {cuentos.length > 0 ? cuentos.map((cuento) => renderCuentoCard(cuento, true)) : (
            <div className="lg:col-span-2 rounded-2xl border-2 border-dashed border-emerald-200 bg-white/60 text-center py-16">
              <p className="text-emerald-700 font-medium italic">Aún no hay cuentos publicados.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (section === "coplas") {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/entre-letras")}
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a Entre Letras
          </Button>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">{coplas.length} coplas</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Coplas</h1>
          <p className="text-slate-500 mt-2 text-lg">Ritmos, rimas y voces inspiradas en nuestra comunidad.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {coplas.length > 0 ? (
            coplas.map((copla) => (
              <article key={copla.id} className="group overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm hover:shadow-md transition-all">
                {copla.imagen_url && (
                  <img
                    src={copla.imagen_url}
                    alt={copla.titulo || "Copla"}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-amber-600 font-semibold">
                    {formatDate(copla.fecha_creacion)}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-800">{copla.titulo || "Copla sin título"}</h3>
                  {copla.autor && <p className="mt-2 text-sm font-medium text-amber-700">{copla.autor}</p>}
                  {copla.descripcion && <p className="mt-3 text-sm text-slate-600 leading-relaxed">{copla.descripcion}</p>}
                </div>
              </article>
            ))
          ) : (
            <div className="md:col-span-2 xl:col-span-3 rounded-2xl border-2 border-dashed border-amber-200 bg-white/60 text-center py-16">
              <p className="text-amber-700 font-medium italic">Aún no hay coplas publicadas.</p>
            </div>
          )}
        </div>
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
              cuentos.slice(0, 3).map((cuento) => (
                <div key={cuento.id}>{renderCuentoCard(cuento)}</div>
              ))
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-white/60 text-center py-16">
                <p className="text-emerald-700 font-medium italic">Aún no hay cuentos publicados.</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/entre-letras/cuentos")}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 cursor-pointer"
            >
              Ver todos los cuentos
              <ChevronRight size={18} className="ml-2" />
            </Button>
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
              coplas.slice(0, 4).map((copla) => (
                <article
                  key={copla.id}
                  onClick={() => navigate("/entre-letras/coplas")}
                  className="group cursor-pointer hover:cursor-pointer overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm hover:shadow-md transition-all"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate("/entre-letras/coplas");
                    }
                  }}
                >
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

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/entre-letras/coplas")}
              className="border-amber-200 text-amber-700 hover:bg-amber-50 cursor-pointer"
            >
              Ver todas las coplas
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
