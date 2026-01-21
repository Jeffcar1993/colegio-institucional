import { Link } from 'react-router-dom';
import escudo from '../assets/escudo.jpeg'; 

const Navbar = () => {
  return (
    // Aumentamos el alto del nav a h-24 para que respire
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 h-30 p-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          
          {/* Contenedor del Logo con padding superior para bajar el texto */}
          <Link to="/" className="flex flex-col items-center pt-4">
            <span className="text-xl font-bold text-green-900 leading-none">
              IED <span className="text-green-600">KENNEDY</span>
            </span>
            <img 
              src={escudo} 
              alt="Escudo IED Kennedy" 
              // Bajamos un poco el tamaño a h-14 para que no sea tan invasivo, o mantén h-16
              className="h-20 w-auto mt-1 object-contain" 
            />
          </Link>

          {/* Menú de navegación */}
          <div className="flex space-x-8 items-center font-medium text-gray-700">
            <Link to="/" className="hover:text-green-600 transition">Inicio</Link>
            <Link to="/nosotros" className="hover:text-green-600 transition">Institución</Link>
            <Link to="/contacto" className="hover:text-green-600 transition">Contacto</Link>
            <Link to="/comunicados" className="hover:text-green-600 transition">Comunicados</Link>
            <Link to="/admisiones" className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">
              Admisiones
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;