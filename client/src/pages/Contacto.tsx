import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Clock } from "lucide-react";

const Contacto = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Atención al Ciudadano</h1>
        <p className="text-slate-600 mt-2">Estamos aquí para resolver tus dudas e inquietudes.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* INFO DE CONTACTO */}
        <div className="space-y-6">
          <Card className="border-none shadow-none bg-green-50">
            <CardContent className="p-6 flex items-start gap-4">
              <MapPin className="text-green-700 shrink-0" />
              <div>
                <h4 className="font-bold text-green-900">Dirección</h4>
                <p className="text-sm text-slate-700">Calle Principal #4-56, San Pedro de Jagua</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-blue-50">
            <CardContent className="p-6 flex items-start gap-4">
              <Clock className="text-blue-700 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900">Horario de Atención</h4>
                <p className="text-sm text-slate-700">Lunes a Viernes: 7:00 AM - 3:00 PM</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-slate-100">
            <CardContent className="p-6 flex items-start gap-4">
              <Phone className="text-slate-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Teléfonos</h4>
                <p className="text-sm text-slate-700">+57 (123) 456 7890<br/>Secretaría: Ext. 101</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FORMULARIO */}
        <div className="md:col-span-2">
          <form className="bg-white p-8 rounded-xl border shadow-sm space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Nombre Completo</label>
                <Input placeholder="Tu nombre..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Correo Electrónico</label>
                <Input type="email" placeholder="correo@ejemplo.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Asunto</label>
              <Input placeholder="Ej. Certificado de notas" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Mensaje</label>
              <Textarea placeholder="Escribe tu consulta aquí..." className="min-h-[150px]" />
            </div>
            <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-6">
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>

      {/* MAPA GOOGLE REAL */}
      <div className="mt-16 w-full h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.24151608444!2d-73.3276718!3d4.6464698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f59aaf5f673c1%3A0x3c81802b53984ad9!2sIERD%20Colegio%20Kennedy%20San%20Pedro%20de%20Jagua!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación IERD Colegio Kennedy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contacto;