import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Admisiones = () => {
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre del Acudiente</label>
                  <Input placeholder="Ej. Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <Input type="email" placeholder="juan@ejemplo.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Grado al que postula</label>
                <Input placeholder="Ej. Primero de Primaria" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje o Dudas</label>
                <Textarea placeholder="Cuéntanos más sobre el estudiante..." className="min-h-[100px]" />
              </div>

              <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-6 text-lg">
                Enviar Solicitud
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Admisiones