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

import Chatbot from './pages/Chatbot';
import AlbumDetalle from './pages/AlbumDetalle';
import Uniformes from './pages/Uniformes';
import Sedes from './pages/Sedes';
import DocumentosInstitucionales from './pages/DocumentosInstitucionales';
import SimbolosInstitucionales from './pages/SimbolosInstitucionales';

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
            <Route path="/uniformes" element={<Uniformes />} />
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/documentos-institucionales" element={<DocumentosInstitucionales />} />
            <Route path="/simbolos-institucionales" element={<SimbolosInstitucionales />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admisiones" element={<Admisiones />} />
            <Route path="/comunicados" element={<Comunicados />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/galeria/:id" element={<AlbumDetalle />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;