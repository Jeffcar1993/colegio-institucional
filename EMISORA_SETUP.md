# Configuración de la Emisora en Vivo

## Variables de Entorno Requeridas

```env
# Token público del widget de Caster.fm (recomendado)
VITE_CASTER_PUBLIC_TOKEN=9247888f-f72a-47d0-9f8a-ed0a3f811d9c

# Opcional: URL de stream por relay/backend
# VITE_STREAM_URL=http://localhost:5000/api/radio/live
```

## Variables de Entorno del Backend (Opcional: Plan B Relay)

En `server/.env` agrega:

```env
RADIO_SOURCE_URL=http://sapircast.caster.fm:19046/estVo
RADIO_SOURCE_USERNAME=source
RADIO_SOURCE_PASSWORD=tu_password_de_broadcast
```

## Configuración con BUTT (Broadcast Using This Tool)

### 1. Obtener la URL del Stream
- Si BUTT está conectado a caster.fm, obtendrás una URL similar a:
  - `http://sapircast.caster.fm:19046/estVo`
- Si BUTT está en localhost:
  - `http://localhost:8000/stream` (puerto por defecto, verificar configuración)

### 2. Configurar en el Proyecto
1. Crea un archivo `.env.local` en la raíz del cliente:
```bash
cd client
echo 'VITE_CASTER_PUBLIC_TOKEN=9247888f-f72a-47d0-9f8a-ed0a3f811d9c' > .env.local
```

2. Si vas a usar relay, configura en `server/.env` las variables `RADIO_SOURCE_URL`, `RADIO_SOURCE_USERNAME` y `RADIO_SOURCE_PASSWORD`

3. Levanta el frontend (`client`) y el widget reproducirá directo desde Caster.fm

## Configuración con Caster.fm

1. Ve a [caster.fm](https://caster.fm)
2. Crea una nueva transmisión
3. Obtén el URL único del stream
4. Configúralo en las variables de entorno como se muestra arriba

## Características del Reproductor

✅ Botón Play/Stop para controlar la transmisión
✅ Indicador visual de "EN TRANSMISIÓN" cuando está activo
✅ Animación de pulso en el ícono de radio mientras transmite
✅ Barras de audio animadas que muestran actividad
✅ Manejo de errores con notificación si el stream no es accesible
✅ Estilos coherentes con el diseño del colegio (colores verde y blanco)
✅ Responsive para móvil y escritorio
✅ Ícono de volumen (UI, volumen controlable por navegador)

## Notas Importantes

- La transmisión NO se guarda en la base de datos (como se requirió)
- El stream se controla mediante HTML5 Audio API
- Si no hay transmisión ON AIR, la web sigue funcionando normalmente
- Si el stream no está disponible, no se bloquea la interfaz ni se muestra alert
