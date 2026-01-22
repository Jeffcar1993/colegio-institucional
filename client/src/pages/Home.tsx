import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN HERO */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
  {/* FONDO MEJORADO */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-slate-900 to-blue-900">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
  </div>

  <div className="relative z-10 text-center px-4 max-w-4xl">
    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">
      Liderazgo y Excelencia desde 1890
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-slate-200 font-light">
      Formando a las futuras generaciones de San Pedro de Jagua con valores, ciencia y cultura.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 shadow-lg shadow-green-900/20">
        <Link to="/admisiones">Inscripciones 2026</Link>
      </Button>
      <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white hover:text-slate-900 text-lg px-8 py-6 backdrop-blur-sm">
        Ver Programas
      </Button>
    </div>
  </div>
</section>

      {/* SECCIÓN PILARES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">¿Por qué elegir el IED Kennedy?</h2>
            <div className="h-1 w-20 bg-green-600 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <GraduationCap size={40}/>, title: "Calidad Académica", desc: "Altos estándares evaluativos y preparación para el ICFES." },
              { icon: <Users size={40}/>, title: "Comunidad Unida", desc: "Acompañamiento cercano entre docentes, padres y alumnos." },
              { icon: <BookOpen size={40}/>, title: "Bilingüismo", desc: "Programa de inglés intensivo desde primaria." },
              { icon: <Award size={40}/>, title: "Formación en Valores", desc: "Educación basada en el respeto, la ética y la fe." },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 space-y-4 hover:scale-105 transition-transform">
                <div className="text-green-700 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN ANUNCIOS RÁPIDOS */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-6">Próximos Eventos</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-600">
                <p className="text-sm text-green-700 font-bold">13 FEB, 2026</p>
                <h4 className="font-bold">Reunión General de Padres de Familia</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
                <p className="text-sm text-blue-700 font-bold">12 MAR, 2026</p>
                <h4 className="font-bold">Día de la Ciencia y la Innovación</h4>
              </div>
            </div>
          </div>
          <div className="bg-green-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">¿Buscas cupo?</h3>
            <p className="mb-6">El proceso de admisiones para el año lectivo 2026 ya está abierto. Te invitamos a ser parte de nuestra comunidad educativa.</p>
            <Button variant="secondary" className="w-full font-bold">Descargar Guía de Inscripción</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;