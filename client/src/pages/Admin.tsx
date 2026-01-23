import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, LogOut, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Admision {
  id: number;
  nombre_acudiente: string;
  correo: string;
  grado_postula: string;
  mensaje: string;
  fecha_solicitud: string | null;
}

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
}

export default function AdminDashboard() {
  const [admisiones, setAdmisiones] = useState<Admision[]>([]);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
  return localStorage.getItem("admin_session") === "true";
});
  const [password, setPassword] = useState("");
  const [publicando, setPublicando] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nuevoComunicado, setNuevoComunicado] = useState({
  titulo: "",
  categoria: "Académico",
  importancia: "Normal",
  resumen: "",
  adjunto_url: "" // Nuevo campo
});

  const ADMIN_PASSWORD = "IED_Kennedy_2026";

  const fetchData = async () => {
  setLoading(true); // <--- Empezamos a cargar
  try {
    const [resAdm, resMsg, resCom] = await Promise.all([
      fetch("http://localhost:5000/api/admisiones"),
      fetch("http://localhost:5000/api/contacto"),
      fetch("http://localhost:5000/api/comunicados")
    ]);
      
      if (!resAdm.ok || !resMsg.ok || !resCom.ok) throw new Error("Error en el servidor");
      
      const dataAdm = await resAdm.json();
      const dataMsg = await resMsg.json();
      const dataCom = await resCom.json();

      setAdmisiones(Array.isArray(dataAdm) ? dataAdm : []);
      setMensajes(Array.isArray(dataMsg) ? dataMsg : []);
      setComunicados(Array.isArray(dataCom) ? dataCom : []);
      setError(null);
    }catch {
    setError("Error al conectar con la base de datos.");
  } finally {
    setLoading(false); // <--- Terminamos de cargar
  }
  };

  const eliminarElemento = async (tipo: string, id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/${tipo}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchData(); 
      }
    } catch {
      alert("No se pudo eliminar");
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("admin_session", "true");
    setIsAuthenticated(true);
    // Disparar carga de datos inmediatamente después de autenticar
    fetchData(); 
    setPassword("");
  } else {
    setError("Contraseña incorrecta.");
  }
};

const handleLogout = () => {
  setIsAuthenticated(false);
  localStorage.removeItem("admin_session"); // Limpiamos la memoria
};

const handlePublicar = async (e: React.FormEvent) => {
  e.preventDefault();
  setPublicando(true);
  try {
    const res = await fetch("http://localhost:5000/api/comunicados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoComunicado),
    });
    if (res.ok) {
      alert("Publicado con éxito");
      // Limpiamos TODO el objeto, incluyendo el nuevo campo
      setNuevoComunicado({ 
        titulo: "", 
        categoria: "Académico", 
        importancia: "Normal", 
        resumen: "",
        adjunto_url: "" // <-- Importante limpiar esto también
      });
      fetchData();
    }
  } catch {
    alert("Error al publicar");
  } finally {
    setPublicando(false);
  }
};

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

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-green-700" />
      <p className="mt-4 text-slate-600 font-medium">Sincronizando con el servidor institucional...</p>
    </div>
  );
}

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Salir
        </Button>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="admisiones">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="admisiones">Admisiones ({admisiones.length})</TabsTrigger>
          <TabsTrigger value="mensajes">Mensajes ({mensajes.length})</TabsTrigger>
          <TabsTrigger value="publicar">📢 Comunicados</TabsTrigger>
        </TabsList>

        <TabsContent value="admisiones">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Acudiente</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admisiones.map((adm) => (
                    <TableRow key={adm.id}>
                      <TableCell className="font-medium">{adm.nombre_acudiente}<br/><span className="text-xs text-slate-500">{adm.correo}</span></TableCell>
                      <TableCell><Badge>{adm.grado_postula}</Badge></TableCell>
                      <TableCell>{adm.fecha_solicitud ? new Date(adm.fecha_solicitud).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => eliminarElemento('admisiones', adm.id)} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

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
                      <TableCell className="font-medium">{msg.nombre}</TableCell>
                      <TableCell>{msg.asunto}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => eliminarElemento('contacto', msg.id)} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publicar">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Formulario de Redacción (Ocupa 2 columnas en pantallas grandes) */}
            <Card className="xl:col-span-2 shadow-md border-t-4 border-t-green-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-green-600" />
                  Redactar Comunicado Oficial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePublicar} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Título del Documento</label>
                      <Input 
                        placeholder="Ej: Circular Mensual de Padres" 
                        value={nuevoComunicado.titulo} 
                        onChange={(e) => setNuevoComunicado({...nuevoComunicado, titulo: e.target.value})} 
                        required 
                        className="bg-slate-50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Categoría</label>
                        <Input 
                          placeholder="Académico" 
                          value={nuevoComunicado.categoria} 
                          onChange={(e) => setNuevoComunicado({...nuevoComunicado, categoria: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Importancia</label>
                        <Input 
                          placeholder="Alta / Normal" 
                          value={nuevoComunicado.importancia} 
                          onChange={(e) => setNuevoComunicado({...nuevoComunicado, importancia: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                      Cuerpo del Comunicado 
                      <span className="text-xs font-normal text-slate-400 italic">Soporta formato largo (Hoja Word)</span>
                    </label>
                    <Textarea 
                      placeholder="Escriba aquí el contenido detallado..." 
                      value={nuevoComunicado.resumen} 
                      onChange={(e) => setNuevoComunicado({...nuevoComunicado, resumen: e.target.value})} 
                      required 
                      className="min-h-[500px] text-lg leading-relaxed bg-white border-slate-300 focus:ring-green-500 font-serif p-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Enlace Adjunto (Opcional)</label>
                    <Input 
                      placeholder="https://enlace-a-tu-pdf-o-imagen.com" 
                      value={nuevoComunicado.adjunto_url} 
                      onChange={(e) => setNuevoComunicado({...nuevoComunicado, adjunto_url: e.target.value})} 
                      className="bg-blue-50/50 border-blue-100"
                    />
                    <p className="text-[10px] text-slate-400 italic">Puedes pegar links de Google Drive, OneDrive o imágenes directas.</p>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={publicando} 
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-8 text-xl shadow-lg transition-all"
                  >
                    {publicando ? (
                      <><Loader2 className="mr-2 animate-spin" /> Procesando...</>
                    ) : (
                      "PUBLICAR DOCUMENTO OFICIAL"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Lista de Gestión (Ocupa 1 columna) */}
            <Card className="shadow-sm bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-slate-600">Historial Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comunicados.length > 0 ? comunicados.map((com) => (
                    <div key={com.id} className="flex items-center justify-between p-4 border rounded-xl bg-white hover:border-green-300 transition-colors shadow-sm">
                      <div className="overflow-hidden">
                        <p className="font-bold text-slate-800 truncate">{com.titulo}</p>
                        <Badge variant="outline" className="text-[10px] bg-slate-50">{com.categoria}</Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => eliminarElemento('comunicados', com.id)} 
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )) : (
                    <p className="text-center text-slate-400 text-sm py-10">No hay publicaciones previas.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}