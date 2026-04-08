
const Horarios = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-green-800">Horarios</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta Kennedy */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img src="/img/sede-principal.jpeg" alt="Sede Kennedy" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2 text-center">Horarios Sede Kennedy</h2>
            <p className="text-slate-600 text-center mb-4">Consulta los horarios académicos de la sede principal.</p>
            <button
              className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow hover:scale-105 transition-all border border-green-600 cursor-not-allowed opacity-60"
              disabled
            >
              Próximamente
            </button>
          </div>
          {/* Tarjeta General Santander */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img src="/img/general-santander.jpeg" alt="Sede General Santander" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2 text-center">Horarios Sede General Santander</h2>
            <p className="text-slate-600 text-center mb-4">Horarios para la sede General Santander.</p>
            <button
              className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow hover:scale-105 transition-all border border-green-600 cursor-not-allowed opacity-60"
              disabled
            >
              Próximamente
            </button>
          </div>
          {/* Tarjeta Sedes Rurales */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img src="/img/soya.jpeg" alt="Sedes Rurales" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2 text-center">Horarios Sedes Rurales</h2>
            <p className="text-slate-600 text-center mb-4">Horarios para las sedes rurales de la institución.</p>
            <button
              className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow hover:scale-105 transition-all border border-green-600 cursor-not-allowed opacity-60"
              disabled
            >
              Próximamente
            </button>
          </div>
        </div>
        <p className="mt-10 text-slate-500 text-center">Pronto podrás consultar y descargar los horarios de cada sede.</p>
      </div>
    </div>
  );
};

export default Horarios;
