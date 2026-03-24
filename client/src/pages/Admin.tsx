import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, LogOut, Send, Trash2, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import API_BASE_URL from "@/config/api";

// --- INTERFACES ---

interface Mensaje {
  id: number;
  nombre: string;
  asunto: string;
  mensaje: string;
  fecha_envio: string | null;
}

interface Comunicado {
  id: number;
  titulo: string;
  categoria: string;
  importancia: string;
  resumen: string;
  adjunto_url?: string;
}

interface Album {
  id: number;
  titulo: string;
  portada_url: string;
  cantidad_fotos?: number;
}

interface BlogPost {
  id: number;
  titulo: string;
  categoria: string;
  contenido: string;
  imagen_url?: string;
  fecha_creacion: string;
}

export default function AdminDashboard() {
  // --- ESTADOS ---
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [albumes, setAlbumes] = useState<Album[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("admin_session") === "true");
  const [password, setPassword] = useState("");
  const [publicando, setPublicando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creadoAlbum, setCreadoAlbum] = useState(false);

  const [publicandoBlog, setPublicandoBlog] = useState(false);
  const [nuevoBlog, setNuevoBlog] = useState({
    titulo: "",
    categoria: "Noticias",
    contenido: "",
    imagen_url: ""
  });

  const [nuevoAlbum, setNuevoAlbum] = useState({ titulo: "" });
  const [nuevoComunicado, setNuevoComunicado] = useState({
    titulo: "",
    categoria: "Académico",
    importancia: "Normal",
    resumen: "",
    adjunto_url: ""
  });

  const ADMIN_PASSWORD = "IED_Kennedy_2026";

  // --- FUNCIONES DE CARGA Y ELIMINACIÓN ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resMsg, resCom, resAlb, resBlg] = await Promise.all([
        fetch(`${API_BASE_URL}/api/contacto`),
        fetch(`${API_BASE_URL}/api/comunicados`),
        fetch(`${API_BASE_URL}/api/albumes`),
        fetch(`${API_BASE_URL}/api/blog`)
      ]);
      const dataMsg = await resMsg.json();
      const dataCom = await resCom.json();
      const dataAlb = await resAlb.json();
      const dataBlg = await resBlg.json();
      setMensajes(Array.isArray(dataMsg) ? dataMsg : []);
      setComunicados(Array.isArray(dataCom) ? dataCom : []);
      setAlbumes(Array.isArray(dataAlb) ? dataAlb : []);
      setBlogs(Array.isArray(dataBlg) ? dataBlg : []);
    } catch {
      console.error("Error al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarElemento = async (tipo: string, id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/${tipo}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch {
      alert("No se pudo eliminar");
    }
  };

  // --- GESTIÓN DE GALERÍA (CLOUDINARY) ---
  const manejarSubidaFoto = (albumId: number) => {
    interface CloudinaryResult {
      event?: string;
      info?: { secure_url: string };
    }
    interface CloudinaryWidget {
      open: () => void;
    }
    interface CloudinaryWindow extends Window {
      cloudinary: {
        createUploadWidget: (config: object, callback: (error: object | null, result: CloudinaryResult | undefined) => void) => CloudinaryWidget;
      };
    }
    // @ts-expect-error Cloudinary widget is loaded dynamically via script
      const widget = (window as CloudinaryWindow).cloudinary.createUploadWidget({
        cloudName: 'dyknrzw2o', // <--- ESTO ES VITAL
        uploadPreset: 'ied_kennedy_preset', // Asegúrate que sea el mismo que creaste
        sources: ['local', 'url', 'camera'],
        multiple: true,
        language: 'es',
      }, async (error: object | null, result: CloudinaryResult | undefined) => {
      if (!error && result && result.event === "success" && result.info?.secure_url) {
        // Agregar la foto al álbum
        await fetch(`${API_BASE_URL}/api/albumes/${albumId}/fotos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: result.info.secure_url })
        });

        fetchData();
      }
    });
    widget.open();
  };

  const handleCrearAlbum = async () => {
    if (!nuevoAlbum.titulo) return alert("Ponle un nombre al álbum");
    setCreadoAlbum(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/albumes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoAlbum),
      });
      if (res.ok) {
        setNuevoAlbum({ titulo: "" });
        fetchData();
        alert("Álbum creado exitosamente.");
      }
    } catch {
      alert("Error al crear álbum");
    } finally {
      setCreadoAlbum(false);
    }
  };

  // --- AUTENTICACIÓN Y PUBLICACIÓN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_session", "true");
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  const handlePublicar = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublicando(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/comunicados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoComunicado),
      });
      if (res.ok) {
        setNuevoComunicado({ titulo: "", categoria: "Académico", importancia: "Normal", resumen: "", adjunto_url: "" });
        fetchData();
        alert("Comunicado publicado");
      }
    } finally {
      setPublicando(false);
    }
  };

  const handlePublicarBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublicandoBlog(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoBlog),
      });
      if (res.ok) {
        setNuevoBlog({ titulo: "", categoria: "Noticias", contenido: "", imagen_url: "" });
        fetchData();
        alert("Entrada de blog publicada");
      }
    } finally {
      setPublicandoBlog(false);
    }
  };

  useEffect(() => { if (isAuthenticated) fetchData(); }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle className="text-center">Panel Admin IED Kennedy</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" placeholder="Clave" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" className="w-full bg-green-900 hover:bg-green-700 text-white font-bold py-6">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-green-700" />
      <p className="mt-4 text-slate-600">Sincronizando datos...</p>
    </div>
  );

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        <Button variant="outline" onClick={() => { setIsAuthenticated(false); localStorage.removeItem("admin_session"); }}>
          <LogOut className="mr-2 h-4 w-4" /> Salir
        </Button>
      </div>

      <Tabs defaultValue="mensajes">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="mensajes" className="cursor-pointer">Mensajes ({mensajes.length})</TabsTrigger>
          <TabsTrigger value="publicar" className="cursor-pointer">📢 Comunicados</TabsTrigger>
          <TabsTrigger value="blog" className="cursor-pointer">✍️ Blog</TabsTrigger>
          <TabsTrigger value="galeria" className="cursor-pointer">🖼️ Galería</TabsTrigger>
        </TabsList>

        {/* CONTENIDO: MENSAJES */}
        <TabsContent value="mensajes">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Remitente</TableHead>
                    <TableHead>Asunto</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mensajes.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell>{msg.nombre}</TableCell>
                      <TableCell>{msg.asunto}</TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => eliminarElemento('contacto', msg.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONTENIDO: COMUNICADOS */}
        <TabsContent value="publicar">
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="xl:col-span-2 shadow-md border-t-4 border-t-green-600">
              <CardHeader><CardTitle className="flex items-center gap-2"><Send className="h-5 w-5" /> Redactar</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handlePublicar} className="space-y-4">
                  <Input placeholder="Título" value={nuevoComunicado.titulo} onChange={(e) => setNuevoComunicado({...nuevoComunicado, titulo: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Categoría" value={nuevoComunicado.categoria} onChange={(e) => setNuevoComunicado({...nuevoComunicado, categoria: e.target.value})} />
                    <Input placeholder="Enlace Adjunto" value={nuevoComunicado.adjunto_url} onChange={(e) => setNuevoComunicado({...nuevoComunicado, adjunto_url: e.target.value})} />
                  </div>
                  <Textarea placeholder="Contenido..." value={nuevoComunicado.resumen} onChange={(e) => setNuevoComunicado({...nuevoComunicado, resumen: e.target.value})} required className="min-h-[300px]" />
                  <Button type="submit" disabled={publicando} className="w-full bg-green-700">{publicando ? <Loader2 className="animate-spin" /> : "Publicar"}</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="p-4 bg-slate-50">
                <h3 className="font-bold mb-4">Recientes</h3>
                {comunicados.map(c => (
                  <div key={c.id} className="flex justify-between items-center bg-white p-2 mb-2 rounded border">
                    <span className="text-sm truncate">{c.titulo}</span>
                    <Button variant="ghost" size="sm" onClick={() => eliminarElemento('comunicados', c.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                  </div>
                ))}
            </Card>
           </div>
        </TabsContent>

        {/* CONTENIDO: BLOG */}
        <TabsContent value="blog">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="xl:col-span-2 shadow-md border-t-4 border-t-purple-600">
              <CardHeader><CardTitle className="flex items-center gap-2"><Send className="h-5 w-5" /> Nueva Entrada</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handlePublicarBlog} className="space-y-4">
                  <Input placeholder="Título" value={nuevoBlog.titulo} onChange={(e) => setNuevoBlog({...nuevoBlog, titulo: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Categoría (ej: Noticias, Eventos...)" value={nuevoBlog.categoria} onChange={(e) => setNuevoBlog({...nuevoBlog, categoria: e.target.value})} />
                    <Input placeholder="URL de imagen de portada (opcional)" value={nuevoBlog.imagen_url} onChange={(e) => setNuevoBlog({...nuevoBlog, imagen_url: e.target.value})} />
                  </div>
                  <Textarea placeholder="Contenido de la entrada..." value={nuevoBlog.contenido} onChange={(e) => setNuevoBlog({...nuevoBlog, contenido: e.target.value})} required className="min-h-[300px]" />
                  <Button type="submit" disabled={publicandoBlog} className="w-full bg-purple-700 hover:bg-purple-800">{publicandoBlog ? <Loader2 className="animate-spin" /> : "Publicar Entrada"}</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="p-4 bg-slate-50">
              <h3 className="font-bold mb-4">Entradas Recientes</h3>
              {blogs.map(b => (
                <div key={b.id} className="flex justify-between items-center bg-white p-2 mb-2 rounded border">
                  <span className="text-sm truncate">{b.titulo}</span>
                  <Button variant="ghost" size="sm" onClick={() => eliminarElemento('blog', b.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                </div>
              ))}
              {blogs.length === 0 && <p className="text-xs text-slate-400 italic">No hay entradas publicadas.</p>}
            </Card>
          </div>
        </TabsContent>

        {/* CONTENIDO: GALERÍA */}
        <TabsContent value="galeria">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader><CardTitle>Nuevo Álbum</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Nombre del álbum" value={nuevoAlbum.titulo} onChange={(e) => setNuevoAlbum({...nuevoAlbum, titulo: e.target.value})} />
                <Button onClick={handleCrearAlbum} disabled={creadoAlbum} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"><Plus className="mr-2" /> {creadoAlbum ? "Creando..." : "Crear Carpeta"}</Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Álbumes Activos</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {albumes.map((alb) => (
                    <div key={alb.id} className="p-4 border rounded-xl bg-white shadow-sm flex flex-col justify-between">
                      <div className="mb-4">
                        <h3 className="font-bold text-slate-800">{alb.titulo}</h3>
                        <p className="text-xs text-slate-400">ID: #{alb.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => manejarSubidaFoto(alb.id)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2"><ImageIcon className="mr-2 h-4 w-4" /> Subir Fotos</Button>
                        <Button variant="outline" onClick={() => eliminarElemento('albumes', alb.id)} className="text-red-500 border-red-100"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}