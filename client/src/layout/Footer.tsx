import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import escudo from '../assets/escudo.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Grid ajustado: 1 columna en móvil, 2 en tablet, 4 en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          
          {/* Columna 1: Identidad - Centrada en móvil */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <img src={escudo} alt="Escudo" className="h-12 w-auto bg-white rounded-full p-1" />
              <span className="font-bold text-white text-xl tracking-tight">IED KENNEDY</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Formando seres críticos para un desarrollo integral.
            </p>
            <div className="text-xs space-y-1 text-slate-400">
              <p><span className="font-semibold">Código DANE:</span> 225839000911</p>
              <p><span className="font-semibold">NIT:</span> 832004852-5</p>
              <p><span className="font-semibold">Código ICFES:</span> 059956</p>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Institución</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/nosotros" className="hover:text-green-500 transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/admisiones" className="hover:text-green-500 transition-colors">Admisiones 2026</Link></li>
              <li><Link to="/nosotros" className="hover:text-green-500 transition-colors">Documentos Oficiales</Link></li>
              <li><Link to="/contacto" className="hover:text-green-500 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo - Manejo de textos largos */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <MapPin size={18} className="text-green-500 shrink-0" />
                <span>San Pedro de Jagua, Cundinamarca</span>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <Phone size={18} className="text-green-500 shrink-0" />
                <div className="flex flex-col">
                  <span>+57 316 545 4433</span>
                  <span>+57 311 263 6245</span>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <Mail size={18} className="text-green-500 shrink-0" />
                <div className="flex flex-col overflow-hidden break-words w-full">
                  <span className="truncate hover:text-clip">iedkennedy_rector@secundinamarca.edu.co</span>
                  <span className="truncate hover:text-clip">Iedkennedy_pagaduria@secundinamarca.edu.co</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="bg-slate-800 p-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="bg-slate-800 p-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="bg-slate-800 p-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea Divisoria y Copyright */}
        <div className="border-t border-slate-800/50 mt-12 pt-8 text-center">
          <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">
            © {currentYear} IED Colegio Kennedy de San Pedro de Jagua.
          </p>
          <p className="text-slate-600 text-[9px] mt-1">Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;