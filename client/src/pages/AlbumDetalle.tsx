import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Foto {
  id: number;
  url: string;
}

const AlbumDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarFotos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/albumes/${id}/fotos`);
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
          {fotos.map((foto) => (
            <div 
              key={foto.id} 
              className="relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-zoom-in"
              onClick={() => window.open(foto.url, '_blank')} // Abre la foto original
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
    </div>
  );
};

export default AlbumDetalle;