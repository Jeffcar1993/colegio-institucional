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
    <div className="min-h-[calc(100vh-6rem)] bg-gradient-to-b from-slate-50 via-white to-emerald-50 px-4 py-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-200/70">
            <Radio size={32} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {RADIO_CONFIG.stationName}
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            {RADIO_CONFIG.description}
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_28px_60px_-24px_rgba(16,185,129,0.30)]">
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-4 ring-white">
                  <Radio size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                    Emisora institucional
                  </p>
                  <p className="text-base font-black text-slate-900">{RADIO_CONFIG.stationName}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm sm:self-auto">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Disponible cuando haya transmisión
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-3 sm:p-6">
              {!scriptError ? (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-inner shadow-slate-100 sm:p-4">
                    <div ref={widgetHostRef} className="emisora-widget-shell overflow-hidden rounded-xl">
                      <div
                        data-type="newStreamPlayer"
                        data-publicToken={widgetToken}
                        data-theme="light"
                        data-color="16a34a"
                        data-channelId=""
                        data-rendered="false"
                        className="cstrEmbed"
                      >
                        <a href="https://www.caster.fm" target="_blank" rel="noreferrer">Shoutcast Hosting</a>{' '}
                        <a href="https://www.caster.fm" target="_blank" rel="noreferrer">Stream Hosting</a>{' '}
                        <a href="https://www.caster.fm" target="_blank" rel="noreferrer">Radio Server Hosting</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
                    <p className="text-[11px] text-slate-500" aria-label="Desarrollado por Caster.fm">
                      Reproductor provisto por{' '}
                      <a className="font-semibold text-emerald-700 underline-offset-2 hover:underline" href="https://www.caster.fm" target="_blank" rel="noreferrer">
                        Caster.fm
                      </a>
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-600">
                      <span>📅</span>
                      <span>
                        Lunes a viernes · <strong className="text-slate-700">10:30 AM – 11:30 AM</strong>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8 text-center text-slate-400">
                  <Radio size={30} strokeWidth={1.5} />
                  <p className="font-medium">El reproductor no está disponible en este momento.</p>
                  <p className="text-xs">La página sigue funcionando normalmente.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-md text-center text-xs leading-relaxed text-slate-500">
          Presiona <strong className="font-bold text-slate-700">Play</strong> dentro del reproductor para sintonizar la emisora.
          Si la transmisión no está activa, el sistema lo indicará automáticamente.
        </p>
      </div>
    </div>
  );
};

export default Emisora;
