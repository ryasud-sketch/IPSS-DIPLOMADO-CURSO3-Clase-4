import { Paciente } from '../models/paciente.model.js'

// ---------------------------------------------------------------------------
// CAPA SERVICES — pacientes. CRUD sin delete: crear, ver, listar, actualizar.
// ---------------------------------------------------------------------------

export const crearPaciente = (datos) => Paciente.create(datos)

export const listarPacientes = () => Paciente.find()

export const buscarPaciente = (id) => Paciente.findById(id)

// returnDocument:'after' devuelve el documento YA actualizado (por defecto
// devolvería el viejo). runValidators aplica las reglas del modelo al update.
export const actualizarPaciente = (id, datos) => {
  return Paciente.findByIdAndUpdate(id, datos, {
    returnDocument: 'after',
    runValidators: true,
  })
}
