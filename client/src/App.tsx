import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Admisiones from './pages/Admisiones';
import Footer from './layout/Footer';
import Comunicados from './pages/Comunicados';
import Galeria from './pages/Galeria';
import AdminDashboard from './pages/Admin';

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
            <Route path="/comunicados" element={<Comunicados />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;