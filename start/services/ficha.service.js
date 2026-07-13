import { Ficha } from '../models/ficha.model.js'

// ---------------------------------------------------------------------------
// CAPA SERVICES — fichas. CRUD completo: crear, listar, ver, editar, eliminar.
// Al listar y ver, populate trae los datos del paciente y del médico.
// ---------------------------------------------------------------------------

export const crearFicha = (datos) => Ficha.create(datos)

export const listarFichas = () => {
  return Ficha.find()
    .populate('paciente', 'nombre rut')
    .populate('medico', 'nombre especialidad')
}

export const buscarFicha = (id) => {
  return Ficha.findById(id)
    .populate('paciente', 'nombre rut')
    .populate('medico', 'nombre especialidad')
}

export const editarFicha = (id, datos) => {
  return Ficha.findByIdAndUpdate(id, datos, {
    returnDocument: 'after',
    runValidators: true,
  })
}

// Hard delete: borra el documento de verdad (en la clase 5 veremos el soft delete).
export const eliminarFicha = (id) => Ficha.findByIdAndDelete(id)
