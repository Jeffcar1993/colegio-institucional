import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Calendar } from "lucide-react";

const Galeria = () => {
  const albumes = [
    {
      id: 1,
      titulo: "Celebración Día del Estudiante",
      fecha: "Septiembre 2025",
      fotosCount: 12,
      portada: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000",
      categoria: "Social"
    },
    {
      id: 2,
      titulo: "Olimpiadas Matemáticas",
      fecha: "Agosto 2025",
      fotosCount: 8,
      portada: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
      categoria: "Académico"
    },
    {
      id: 3,
      titulo: "Clausura Deportiva",
      fecha: "Junio 2025",
      fotosCount: 25,
      portada: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoria: "Deportes"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Galería de Momentos</h1>
        <p className="text-slate-600 mt-2">Nuestra historia en imágenes: eventos, logros y vida estudiantil.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albumes.map((album) => (
          <Card key={album.id} className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-xl transition-all">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={album.portada} 
                alt={album.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-600">{album.categoria}</Badge>
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="flex items-center text-xs text-slate-500 mb-2 gap-1">
                <Calendar size={14} />
                {album.fecha}
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-green-700 transition-colors">
                {album.titulo}
              </h3>
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0 flex items-center text-slate-500 text-sm gap-2">
              <ImageIcon size={16} />
              <span>{album.fotosCount} fotos</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Galeria;