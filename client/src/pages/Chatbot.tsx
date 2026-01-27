import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageCircle, X, Send, Sparkles, FileText, 
  MapPin, Search, ArrowRight, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// --- INTERFACES ---
interface ResultadoBusqueda {
  id: number | string;
  tipo: "comunicado" | "contacto" | "institucional" | "pagina";
  titulo: string;
  descripcion: string;
  url: string | null;
  fecha: string;
  es_documento?: boolean;
}

interface Mensaje {
  role: "user" | "bot";
  text: string;
  resultados?: ResultadoBusqueda[];
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [historial, setHistorial] = useState<Mensaje[]>([
    { 
      role: "bot", 
      text: "¡Hola! Soy KennedyBot 🤖. Estoy aquí para ayudarte a encontrar información rápidamente.\n\nPrueba buscando: 'manual', 'horarios' o 'admisiones'." 
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sugerencias = [
    { texto: "Manual de convivencia", emoji: "📖" },
    { texto: "Horarios", emoji: "🕐" },
    { texto: "Galería de fotos", emoji: "🖼️" },
    { texto: "Admisiones", emoji: "🎓" },
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [historial]);

  // --- LÓGICA DE RESPUESTA ---
  const procesarMensaje = async (texto: string) => {
    const q = texto.toLowerCase();
    setBuscando(true);

    // 1. Respuesta de Cortesía
    let respuestaCortesía = "";
    if (q.match(/(hola|buenos días|buenas tardes|saludos)/)) {
      respuestaCortesía = "¡Hola! Un gusto saludarte. ¿En qué puedo apoyarte hoy?";
    } else if (q.match(/(gracias|agradezco|vale|perfecto)/)) {
      respuestaCortesía = "¡Con mucho gusto! Siempre estoy aquí para ayudarte. ¿Hay algo más que necesites?";
    } else if (q.match(/(adiós|chao|hasta luego|nos vemos)/)) {
      respuestaCortesía = "¡Hasta pronto! Que tengas un excelente día. IED Kennedy te desea lo mejor.";
    }

    if (respuestaCortesía) {
      setHistorial(prev => [...prev, { role: "bot", text: respuestaCortesía }]);
      setBuscando(false);
      return;
    }

    // 2. Búsqueda en API
    try {
      const res = await fetch(`http://localhost:5000/api/chatbot/buscar?q=${encodeURIComponent(q)}`);
      const resultados: ResultadoBusqueda[] = await res.json();
      
      if (resultados.length > 0) {
        setHistorial(prev => [...prev, { 
          role: "bot", 
          text: `He encontrado ${resultados.length} enlace(s) que te pueden servir:`,
          resultados 
        }]);
      } else {
        setHistorial(prev => [...prev, { 
          role: "bot", 
          text: `No encontré resultados para "${texto}". Intenta con palabras clave como 'matrícula', 'circulares' o 'nosotros'.` 
        }]);
      }
    } catch {
      setHistorial(prev => [...prev, { role: "bot", text: "⚠️ Error de conexión. Inténtalo más tarde." }]);
    } finally {
      setBuscando(false);
    }
  };

  const handleEnviar = (e?: React.FormEvent, textoDirecto?: string) => {
    if (e) e.preventDefault();
    const query = textoDirecto || mensaje;
    if (!query.trim()) return;

    setHistorial(prev => [...prev, { role: "user", text: query }]);
    setMensaje("");
    procesarMensaje(query);
  };

  const manejarNavegacion = (res: ResultadoBusqueda) => {
  console.log("Navegando a:", res); // Para que veas en consola qué está fallando

  // 1. Si es un documento PDF o enlace externo
  if (res.url && (res.url.endsWith('.pdf') || res.url.startsWith('http'))) {
    window.open(res.url, "_blank");
    return;
  }

  // 2. Si es una sección interna del sitio
  if (res.url && res.url.startsWith('/')) {
    setIsOpen(false);
    navigate(res.url); // Usa el router de React para no recargar la web
  } else {
    // Caso de emergencia: si la URL viene mal del backend
    console.error("Ruta no válida detectada:", res.url);
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <Card className="w-[350px] sm:w-[420px] h-[580px] mb-4 shadow-2xl flex flex-col pointer-events-auto border-none overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-gradient-to-r from-green-800 to-green-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400" />
                ASISTENTE KENNEDY
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 h-8 w-8 rounded-full">
                <X size={18} />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
            {historial.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === "user" ? "bg-green-700 text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none border"
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.resultados && (
                  <div className="mt-2 space-y-2 w-full max-w-[90%]">
                    {msg.resultados.map((res, idx) => (
                      <button
                        key={idx}
                        onClick={() => manejarNavegacion(res)}
                        className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200 hover:border-green-500 hover:bg-green-50 rounded-xl text-left transition-all group"
                      >
                        <div className="bg-green-100 p-2 rounded-lg text-green-700 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          {res.tipo === 'pagina' ? <MapPin size={16} /> : <FileText size={16} />}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs font-bold text-slate-700 truncate group-hover:text-green-800">{res.titulo}</p>
                          <p className="text-[10px] text-slate-500 truncate">{res.descripcion}</p>
                        </div>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-green-600" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {buscando && <div className="text-[10px] text-slate-400 animate-pulse flex items-center gap-2"><Search size={10}/> Consultando archivos...</div>}
          </CardContent>

          <CardFooter className="p-3 bg-white border-t flex flex-col gap-3">
            {historial.length < 4 && (
              <div className="flex gap-2 overflow-x-auto pb-1 w-full no-scrollbar">
                {sugerencias.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEnviar(undefined, sug.texto)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-600 hover:bg-green-100 hover:text-green-700 border border-slate-200 transition-colors"
                  >
                    {sug.emoji} {sug.texto}
                  </button>
                ))}
              </div>
            )}
            <form className="flex w-full gap-2" onSubmit={handleEnviar}>
              <Input 
                placeholder="Pregunta algo..." 
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="text-xs h-9 focus-visible:ring-green-600"
              />
              <Button type="submit" size="sm" className="bg-green-700 hover:bg-green-800 h-9 w-9 p-0 shrink-0">
                <Send size={16} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* BOTÓN FLOTANTE */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto h-16 w-16 bg-green-700 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? (
          <X className="text-white" size={28} />
        ) : (
          <div className="relative">
            <MessageCircle className="text-white" size={32} />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full border-2 border-green-700 animate-bounce" />
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;