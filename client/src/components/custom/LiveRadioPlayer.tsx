import { useEffect, useMemo, useRef, useState } from 'react';
import { RADIO_CONFIG } from '@/config/radio';

const LiveRadioPlayer = () => {
  const [scriptError, setScriptError] = useState(false);
  const widgetHostRef = useRef<HTMLDivElement | null>(null);
  const widgetToken = useMemo(
    () => import.meta.env.VITE_CASTER_PUBLIC_TOKEN || '9247888f-f72a-47d0-9f8a-ed0a3f811d9c',
    []
  );

  useEffect(() => {
    const scriptId = 'caster-fm-embed-script';
    const existingScript = document.getElementById(scriptId);

    // Fuerza reinicializacion del widget al navegar/re-renderizar.
    if (existingScript) {
      existingScript.remove();
    }

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
    <div className="radio-editorial-bar">
      <div className="radio-editorial-accent" aria-hidden="true" />

      <div className="radio-editorial-inner">
        {/* INFO */}
        <div className="radio-editorial-info">
          <div className="radio-live-pill">
            <span className="radio-live-dot" aria-hidden="true" />
            <span>En vivo</span>
          </div>
          <p className="radio-editorial-name">{RADIO_CONFIG.stationName}</p>
          <p className="radio-editorial-desc hidden sm:block">{RADIO_CONFIG.description}</p>
        </div>

        {/* WIDGET */}
        {!scriptError ? (
          <div ref={widgetHostRef} className="radio-widget-shell">
            <div
              data-type="newStreamPlayer"
              data-publicToken={widgetToken}
              data-theme="dark"
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
          <p className="radio-editorial-error">
            Transmisión no disponible — la página sigue funcionando normalmente.
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveRadioPlayer;
