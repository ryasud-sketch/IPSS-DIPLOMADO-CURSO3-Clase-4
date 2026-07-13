// ---------------------------------------------------------------------------
// LA API FALSA (fakeApi) — mismas funciones que realApi, pero con datos
// locales en memoria. No necesita backend: sirve para desarrollar el frontend
// ANTES de que la API exista, o sin conexión.
//
// Exporta EXACTAMENTE las mismas funciones que realApi.js, con la misma firma.
// Por eso api.js puede intercambiar una por otra sin que la app note la diferencia.
// ---------------------------------------------------------------------------

// "Base de datos" en memoria (se reinicia al recargar la página).
const pacientes = [
  { _id: 'p1', nombre: 'Juan Pérez', rut: '11.111.111-1' },
  { _id: 'p2', nombre: 'Ana Soto', rut: '22.222.222-2' },
]

let fichas = [
  {
    _id: 'f1',
    paciente: { _id: 'p1', nombre: 'Juan Pérez', rut: '11.111.111-1' },
    medico: { _id: 'm1', nombre: 'Dra. House', especialidad: 'Diagnóstico' },
    diagnostico: 'Gripe',
    tratamiento: 'Reposo',
  },
]

let siguienteId = 2

// Simula la demora de una red, para que se sienta como una API de verdad.
const demora = (valor) => new Promise((r) => setTimeout(() => r(valor), 250))

const medicoActual = { _id: 'm1', nombre: 'Dra. House', especialidad: 'Diagnóstico' }

export const registrar = async () => demora(medicoActual)

export const login = async () => demora(medicoActual)

export const salir = () => {}

export const listarPacientes = async () => demora([...pacientes])

export const listarFichas = async () => demora([...fichas])

export const crearFicha = async (datos) => {
  const paciente = pacientes.find((p) => p._id === datos.paciente)
  const nueva = {
    _id: 'f' + siguienteId++,
    paciente,
    medico: medicoActual,
    diagnostico: datos.diagnostico,
    tratamiento: datos.tratamiento,
  }
  fichas.push(nueva)
  return demora(nueva)
}

export const eliminarFicha = async (id) => {
  fichas = fichas.filter((f) => f._id !== id)
  return demora({ mensaje: 'Ficha eliminada' })
}
