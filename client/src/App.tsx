import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import { Suspense, lazy } from 'react';
const Comunicados = lazy(() => import('./pages/Comunicados'));
const Galeria = lazy(() => import('./pages/Galeria'));
import AdminDashboard from './pages/Admin';
import Chatbot from './pages/Chatbot';
import AlbumDetalle from './pages/AlbumDetalle';
import Uniformes from './pages/Uniformes';
import Sedes from './pages/Sedes';
import DocumentosInstitucionales from './pages/DocumentosInstitucionales';
import SimbolosInstitucionales from './pages/SimbolosInstitucionales';
import Cronograma from './pages/Cronograma';
import Horarios from './pages/Horarios';
import { Loader2 } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
            {/* <Route path="/admisiones" element={<Admisiones />} /> */}
            <Route path="/comunicados" element={
              <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500"><Loader2 className="h-8 w-8 animate-spin text-green-700 mb-4" /><p>Cargando comunicados...</p></div>}>
                <Comunicados />
              </Suspense>
            } />
            <Route path="/galeria" element={
              <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500"><Loader2 className="h-8 w-8 animate-spin text-green-700 mb-4" /><p>Cargando galería...</p></div>}>
                <Galeria />
              </Suspense>
            } />
            <Route path="/galeria/:id" element={<AlbumDetalle />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/blog" element={<div className='min-h-screen flex items-center justify-center text-2xl text-gray-500'>Blog próximamente...</div>} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;