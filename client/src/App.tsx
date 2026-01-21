import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Admisiones from './pages/Admisiones';

function App() {
  return (
    <Router>
      {/* Usamos flex-col para que el Footer (cuando lo hagamos) siempre se vaya abajo */}
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admisiones" element={<Admisiones />} />
          </Routes>
        </main>
        {/* Aquí irá el Footer pronto */}
      </div>
    </Router>
  );
}

export default App;