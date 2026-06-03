import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import API_BASE_URL from "@/config/api";

interface Foto {
  id: number;
  url: string;
}

const AlbumDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);
  const [fotoActivaIndex, setFotoActivaIndex] = useState<number | null>(null);
  const inicioToqueX = useRef<number | null>(null);
  const finalToqueX = useRef<number | null>(null);

  const cerrarVisor = () => setFotoActivaIndex(null);

  const irFotoAnterior = () => {
    if (fotoActivaIndex === null || fotos.length === 0) return;
    setFotoActivaIndex((fotoActivaIndex - 1 + fotos.length) % fotos.length);
  };

  const irFotoSiguiente = () => {
    if (fotoActivaIndex === null || fotos.length === 0) return;
    setFotoActivaIndex((fotoActivaIndex + 1) % fotos.length);
  };

  const manejarFinToque = () => {
    if (inicioToqueX.current === null || finalToqueX.current === null || fotos.length <= 1) {
      inicioToqueX.current = null;
      finalToqueX.current = null;
      return;
    }

    const distanciaDeslizamiento = inicioToqueX.current - finalToqueX.current;
    const UMBRAL_DESLIZAMIENTO = 50;

    if (Math.abs(distanciaDeslizamiento) >= UMBRAL_DESLIZAMIENTO) {
      if (distanciaDeslizamiento > 0) {
        irFotoSiguiente();
      } else {
        irFotoAnterior();
      }
    }

    inicioToqueX.current = null;
    finalToqueX.current = null;
  };

  useEffect(() => {
    const cargarFotos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/albumes/${id}/fotos`);
        const data = await res.json();
        setFotos(data);
      } catch (error) {
        console.error("Error al cargar fotos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarFotos();
  }, [id]);

  useEffect(() => {
    if (fotoActivaIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cerrarVisor();
      if (event.key === "ArrowLeft") irFotoAnterior();
      if (event.key === "ArrowRight") irFotoSiguiente();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fotoActivaIndex, fotos.length]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin text-green-700" size={48} />
    </div>
  );

  return (
    <div className="container mx-auto py-10 px-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6 hover:bg-slate-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Galería
      </Button>

      <h2 className="text-3xl font-bold mb-8 text-slate-800">Fotos del Álbum</h2>

      {fotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fotos.map((foto, index) => (
            <div 
              key={foto.id} 
              className="relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-zoom-in"
              onClick={() => setFotoActivaIndex(index)}
            >
              <img 
                src={foto.url} 
                alt="Foto del álbum" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed">
          <p className="text-slate-500">Este álbum aún no tiene fotos.</p>
        </div>
      )}

      {fotoActivaIndex !== null && fotos[fotoActivaIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onTouchStart={(event) => {
            inicioToqueX.current = event.touches[0].clientX;
            finalToqueX.current = event.touches[0].clientX;
          }}
          onTouchMove={(event) => {
            finalToqueX.current = event.touches[0].clientX;
          }}
          onTouchEnd={manejarFinToque}
        >
          <button
            onClick={cerrarVisor}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center"
            aria-label="Cerrar visor"
          >
            <X size={20} />
          </button>

          {fotos.length > 1 && (
            <button
              onClick={irFotoAnterior}
              className="absolute left-2 sm:left-6 h-11 w-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <img
            src={fotos[fotoActivaIndex].url}
            alt={`Foto ${fotoActivaIndex + 1} del álbum`}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-lg"
          />

          {fotos.length > 1 && (
            <button
              onClick={irFotoSiguiente}
              className="absolute right-2 sm:right-6 h-11 w-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center"
              aria-label="Foto siguiente"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            {fotoActivaIndex + 1} / {fotos.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetalle;