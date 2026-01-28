import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react'; 
import escudo from '../assets/escudo.jpeg'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown Institución

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-[100] w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex flex-col items-center py-2 shrink-0">
            <span className="text-lg font-black text-green-900 leading-none tracking-tighter">
              IED <span className="text-green-600">KENNEDY</span>
            </span>
            <img src={escudo} alt="Escudo IED Kennedy" className="h-14 w-auto mt-1 object-contain" />
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex space-x-6 items-center font-semibold text-gray-700">
            <Link to="/" className="hover:text-green-600 transition-colors text-sm uppercase tracking-wide">Inicio</Link>
            
            {/* DROPDOWN INSTITUCIÓN */}
            <div 
              className="relative h-full flex items-center group" // h-full ayuda a mantener el área activa
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 hover:text-green-600 cursor-pointer transition-colors text-sm uppercase tracking-wide py-4">
                <Link to="/nosotros">Institución</Link>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Submenú Flotante */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full w-48 pt-2 animate-in fade-in slide-in-from-top-2">
                  {/* El div de arriba es un puente invisible, este de abajo es el menú real */}
                  <div className="bg-white border border-gray-100 shadow-xl rounded-xl py-2 overflow-hidden">
                    <Link 
                      to="/uniformes" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      Uniformes 2026
                    </Link>
                    <Link 
                      to="/sedes" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      Sedes del Colegio
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/contacto" className="hover:text-green-600 transition-colors text-sm uppercase tracking-wide">Contacto</Link>
            <Link to="/comunicados" className="hover:text-green-600 transition-colors text-sm uppercase tracking-wide">Comunicados</Link>
            <Link to="/galeria" className="hover:text-green-600 transition-colors text-sm uppercase tracking-wide">Galeria</Link>
            
            <Link to="/admisiones" className="bg-green-700 text-white px-5 py-2.5 rounded-full hover:bg-green-800 transition-all shadow-md text-sm font-bold">
              Admisiones
            </Link>
          </div>

          {/* BOTÓN HAMBURGUESA MOBILE */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-green-900 p-2">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      <div className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-4 py-4 space-y-1">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 font-medium">Inicio</Link>
          
          {/* Acordeón Institución en Mobile */}
          <div className="space-y-1">
            <div className="flex justify-between items-center px-3 py-2 text-gray-700 font-medium" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Link to="/nosotros" onClick={() => setIsOpen(false)}>Institución</Link>
              <ChevronDown size={20} className={isDropdownOpen ? 'rotate-180' : ''} />
            </div>
            {isDropdownOpen && (
              <div className="pl-6 space-y-1 bg-slate-50 rounded-lg">
                <Link to="/uniformes" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-600">Uniformes 2026</Link>
                <Link to="/sedes" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-600">Sedes del Colegio</Link>
              </div>
            )}
          </div>

          <Link to="/contacto" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 font-medium">Contacto</Link>
          <Link to="/comunicados" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 font-medium">Comunicados</Link>
          <Link to="/galeria" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 font-medium">Galeria</Link>
          <Link to="/admisiones" onClick={() => setIsOpen(false)} className="block w-full text-center bg-green-700 text-white py-3 rounded-xl font-bold mt-4">
            Admisiones
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;