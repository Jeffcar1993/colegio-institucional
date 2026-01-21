import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-green-900">
            IED <span className="text-green-600">KENNEDY</span>
          </Link>

          <div className="flex space-x-8 items-center font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition">Inicio</Link>
            <Link to="/nosotros" className="hover:text-blue-600 transition">Institución</Link>
            <Link to="/contacto" className="hover:text-blue-600 transition">Contacto</Link>
            <Link to="/contacto" className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
              Admisiones
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;