import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import API_BASE_URL from "@/config/api"

const Admisiones = () => {
  // 1. Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre_acudiente: "",
    correo: "",
    grado_postula: "",
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Función para enviar los datos al Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admisiones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Solicitud enviada correctamente. Pronto nos contactaremos contigo.");
        // Limpiar el formulario
        setFormData({ nombre_acudiente: "", correo: "", grado_postula: "", mensaje: "" });
      } else {
        alert("❌ Hubo un problema al enviar la solicitud. Intenta más tarde.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("❌ No se pudo conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-t-4 border-t-blue-900">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-900">Solicitud de Admisión</CardTitle>
            <CardDescription>
              Completa el formulario y nuestro equipo de secretaría académica se pondrá en contacto contigo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 4. Conectar el onSubmit */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre del Acudiente</label>
                  <Input 
                    name="nombre_acudiente"
                    value={formData.nombre_acudiente}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Juan Pérez" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <Input 
                    name="correo"
                    type="email" 
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    placeholder="juan@ejemplo.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Grado al que postula</label>
                <Input 
                  name="grado_postula"
                  value={formData.grado_postula}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Primero de Primaria" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje o Dudas</label>
                <Textarea 
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos más sobre el estudiante..." 
                  className="min-h-[100px]" 
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-6 text-lg transition-all"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Admisiones