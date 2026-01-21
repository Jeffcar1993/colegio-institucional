import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import escudo from '../assets/escudo.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={escudo} alt="Escudo" className="h-12 w-auto bg-white rounded-full p-1" />
              <span className="font-bold text-white text-xl">IED KENNEDY</span>
            </div>
            <p className="text-sm leading-relaxed">
              Formando líderes con valores y excelencia académica en San Pedro de Jagua desde 1890.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Institución</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/nosotros" className="hover:text-green-500 transition">Sobre nosotros</Link></li>
              <li><Link to="/admisiones" className="hover:text-green-500 transition">Admisiones 2026</Link></li>
              <li><Link to="/nosotros" className="hover:text-green-500 transition">Documentos Oficiales</Link></li>
              <li><Link to="/contacto" className="hover:text-green-500 transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-green-500" />
                <span>San Pedro de Jagua, Cundinamarca</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-500" />
                <span>+57 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-500" />
                <span>info@iedkennedy.edu.co</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-green-600 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-green-600 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-green-600 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea Divisoria y Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>© {currentYear} IED Colegio Kennedy de San Pedro de Jagua. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;