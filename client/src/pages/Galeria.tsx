import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Calendar, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Album {
  id: number;
  titulo: string;
  portada_url: string | null;
  fecha_creacion: string;
  cantidad_fotos: number;
}

const Galeria = () => {
  const [albumes, setAlbumes] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inicializas el hook

  useEffect(() => {
    const fetchAlbumes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/albumes");
        const data = await res.json();
        setAlbumes(data);
      } catch (error) {
        console.error("Error cargando galería:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumes();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-green-700" />
        <p className="mt-4 text-slate-600">Abriendo el archivo fotográfico...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Galería de Momentos</h1>
        <p className="text-slate-600 mt-2 text-lg">Nuestra historia en imágenes: eventos, logros y vida estudiantil.</p>
        <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {albumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albumes.map((album) => (
            <Card 
              key={album.id} 
              className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate(`/galeria/${album.id}`)} // <-- CAMBIO AQUÍ
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={album.portada_url || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000"} 
                  alt={album.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    Ver álbum completo <ImageIcon size={18} />
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-600/90 backdrop-blur-sm border-none shadow-lg">
                    Institucional
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center text-xs font-semibold text-slate-400 mb-3 gap-2 uppercase tracking-widest">
                  <Calendar size={14} className="text-green-600" />
                  {new Date(album.fecha_creacion).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 leading-tight group-hover:text-green-700 transition-colors">
                  {album.titulo}
                </h3>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-0 flex items-center text-slate-500 font-medium gap-2">
                <div className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
                  <ImageIcon size={14} className="text-slate-400" />
                  <span>{album.cantidad_fotos || 0} fotos</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 italic">Aún no hemos subido fotos de este año lectivo.</p>
        </div>
      )}
    </div>
  );
};

export default Galeria;