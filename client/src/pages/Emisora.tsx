import { useEffect, useMemo, useRef, useState } from 'react';
import { Radio } from 'lucide-react';
import { RADIO_CONFIG } from '@/config/radio';

const Emisora = () => {
  const [scriptError, setScriptError] = useState(false);
  const widgetHostRef = useRef<HTMLDivElement | null>(null);
  const widgetToken = useMemo(
    () => import.meta.env.VITE_CASTER_PUBLIC_TOKEN || '9247888f-f72a-47d0-9f8a-ed0a3f811d9c',
    []
  );

  useEffect(() => {
    const scriptId = 'caster-fm-embed-script';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.cloud.caster.fm/widgets/embed.js';
    script.async = true;
    script.onerror = () => {
      setScriptError(true);
      console.warn('No se pudo cargar el widget de Caster.fm');
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Cabecera */}
      <div className="flex flex-col items-center gap-3 mb-10 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-2">
          <Radio size={32} strokeWidth={1.8} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {RADIO_CONFIG.stationName}
        </h1>
        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
          {RADIO_CONFIG.description}
        </p>

        {/* Pill EN VIVO */}
        <div className="emisora-live-pill">
          <span className="emisora-live-dot" aria-hidden="true" />
          <span>En vivo cuando la transmisión esté activa</span>
        </div>

        {/* Horario */}
        <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
          <span className="text-green-600 font-semibold">📅</span>
          <span>
            Lunes a viernes &nbsp;·&nbsp;
            <strong className="text-slate-700">10:30 AM – 11:30 AM</strong>
          </span>
        </div>
        <p className="text-xs text-slate-400 -mt-1 text-center max-w-xs">
          Información institucional, programas y más.
        </p>
      </div>

      {/* Tarjeta del reproductor */}
      <div className="emisora-card">
        {!scriptError ? (
          <div ref={widgetHostRef} className="emisora-widget-shell">
            <div
              data-type="newStreamPlayer"
              data-publicToken={widgetToken}
              data-theme="light"
              data-color="16a34a"
              data-channelId=""
              data-rendered="false"
              className="cstrEmbed"
            >
              <a href="https://www.caster.fm">Shoutcast Hosting</a>{' '}
              <a href="https://www.caster.fm">Stream Hosting</a>{' '}
              <a href="https://www.caster.fm">Radio Server Hosting</a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-slate-400 text-sm text-center">
            <Radio size={28} strokeWidth={1.5} />
            <p>El reproductor no está disponible en este momento.</p>
            <p className="text-xs text-slate-400">La página sigue funcionando normalmente.</p>
          </div>
        )}
      </div>

      {/* Nota informativa */}
      <p className="mt-8 text-xs text-slate-400 text-center max-w-sm">
        Presiona <strong className="text-slate-500">Play</strong> para sintonizar la emisora.
        Si no hay transmisión activa, el reproductor lo indicará automáticamente.
      </p>
    </div>
  );
};

export default Emisora;
