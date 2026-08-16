// ---------------------------------------------------------------------------
// LA API REAL — consume el backend de Express en el puerto 3004.
// Guarda el token del login y lo manda en el header de las rutas protegidas.
// ---------------------------------------------------------------------------

const BASE = 'http://localhost:3004'

let token = localStorage.getItem('token') || null

// Helper: hace fetch, agrega el token si lo hay, y maneja la respuesta.
const pedir = async (ruta, opciones = {}) => {
  const headers = { ...opciones.headers }
  if (opciones.body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(BASE + ruta, { ...opciones, headers })
  const cuerpo = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(cuerpo.error || 'Error en la petición')
  }
  return cuerpo
}

export const registrar = async (datos) => {
  const r = await pedir('/auth/registro', { method: 'POST', body: JSON.stringify(datos) })
  token = r.token
  localStorage.setItem('token', token)
  return r.medico
}

export const login = async (email, password) => {
  const r = await pedir('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  token = r.token
  localStorage.setItem('token', token)
  return r.medico
}

export const salir = () => {
  token = null
  localStorage.removeItem('token')
}

export const listarPacientes = () => pedir('/pacientes')

export const listarFichas = () => pedir('/fichas')

export const crearFicha = (datos) =>
  pedir('/fichas', { method: 'POST', body: JSON.stringify(datos) })

export const eliminarFicha = (id) => pedir(`/fichas/${id}`, { method: 'DELETE' })
