import { useEffect } from 'react';

const Cronograma = () => {
  useEffect(() => {
    window.open('/docs/cronograma.pdf', '_blank');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
      Abriendo cronograma...
    </div>
  );
};

export default Cronograma;
