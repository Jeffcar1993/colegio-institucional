const Cronograma = () => {
  const openCronograma = () => {
    window.open('/docs/cronograma.pdf', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-green-800">Cronograma Escolar 2026</h1>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <img
              src="/img/calendario-escolar.svg"
              alt="Calendario institucional"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-green-800 mb-2 text-center">Cronograma Institucional</h2>
          <p className="text-slate-600 text-center mb-6">
            Cronograma institucional oficial para el año lectivo 2026.
          </p>

          <button
            className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow hover:scale-105 transition-all border border-green-600"
            onClick={openCronograma}
          >
            Ver cronograma
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cronograma;
