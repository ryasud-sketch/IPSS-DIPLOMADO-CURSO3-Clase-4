import * as fake from './fakeApi.js'
import * as real from './realApi.js'

// ---------------------------------------------------------------------------
// EL CONMUTADOR fake / real.
//
// El resto de la app SIEMPRE importa desde aquí (import { api } from './api.js').
// No sabe si detrás hay datos locales o la API de verdad: solo llama api.login(),
// api.crearFicha(), etc. Cambiar el origen es cambiar UNA variable.
//
// Arranca según la variable de entorno de Vite (VITE_USE_FAKE en el .env),
// y el toggle de la pantalla puede alternarlo en vivo (queda en localStorage).
// ---------------------------------------------------------------------------

const porDefecto = import.meta.env.VITE_USE_FAKE === 'true'

export const estaEnModoFake = () => {
  const guardado = localStorage.getItem('modoFake')
  return guardado === null ? porDefecto : guardado === 'true'
}

export const alternarModo = () => {
  localStorage.setItem('modoFake', String(!estaEnModoFake()))
}

// api apunta a fake o a real según el modo actual. Misma "forma" en ambos:
// las dos implementaciones exportan las mismas funciones con la misma firma.
export const api = new Proxy(
  {},
  {
    get(_, prop) {
      const impl = estaEnModoFake() ? fake : real
      return impl[prop]
    },
  },
)
