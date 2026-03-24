import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ChevronRight, BookOpen } from "lucide-react";
import API_BASE_URL from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BlogPost {
  id: number;
  titulo: string;
  categoria: string;
  contenido: string;
  imagen_url?: string;
  fecha_creacion: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog`);
        const data = await response.json();
        const sortedData = Array.isArray(data)
          ? data.sort(
              (a: BlogPost, b: BlogPost) =>
                new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime()
            )
          : [];
        setPosts(sortedData);
      } catch (error) {
        console.error("Error cargando blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-green-700 mb-4" />
        <p>Cargando entradas del blog...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-4 mb-10 border-b pb-8">
        <div className="bg-green-100 p-4 rounded-full text-green-700 shadow-sm">
          <BookOpen size={32} />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Blog Institucional</h1>
          <p className="text-slate-500 mt-1 text-lg">Noticias, eventos y vida escolar</p>
        </div>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all border-l-8 border-l-green-600 shadow-sm overflow-hidden border-r border-t border-b">
              {post.imagen_url && (
                <img
                  src={post.imagen_url}
                  alt={post.titulo}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center mb-3">
                  <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 hover:bg-green-100 transition-colors">
                    {post.categoria || "Noticias"}
                  </Badge>
                  <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-widest gap-2">
                    <Calendar size={14} />
                    {new Date(post.fecha_creacion).toLocaleDateString("es-CO")}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-green-700 transition-colors leading-snug">
                  {post.titulo}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3 text-base">
                  {post.contenido}
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-700 hover:bg-green-800 text-white font-bold group px-6">
                      Leer entrada completa
                      <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="w-[95vw] sm:max-w-4xl h-[90vh] sm:h-[88vh] flex flex-col p-0 rounded-xl shadow-2xl overflow-hidden border-none">
                    <DialogHeader className="p-6 pr-14 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:pt-6 border-b bg-slate-50 relative">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-green-600 text-white">{post.categoria || "Noticias"}</Badge>
                        <span className="text-xs text-slate-400 font-mono tracking-tighter">BLOG-ID: {post.id}</span>
                      </div>
                      <DialogTitle className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                        {post.titulo}
                      </DialogTitle>
                      <DialogDescription className="text-slate-500 font-medium">
                        Publicado el {new Date(post.fecha_creacion).toLocaleDateString("es-CO", { dateStyle: "full" })}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white">
                      <div className="max-w-3xl mx-auto">
                        {post.imagen_url && (
                          <img
                            src={post.imagen_url}
                            alt={post.titulo}
                            className="w-full h-auto max-h-[360px] object-cover rounded-xl mb-8"
                          />
                        )}
                        <p className="text-slate-700 text-lg leading-[1.8] whitespace-pre-wrap font-serif">
                          {post.contenido}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium italic">Aun no hay articulos publicados en el blog.</p>
          </div>
        )}
      </div>
    </div>
  );
}
