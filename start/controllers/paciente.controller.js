import * as service from '../services/paciente.service.js'

// ---------------------------------------------------------------------------
// CAPA CONTROLLERS — pacientes (rutas protegidas por JWT).
// ---------------------------------------------------------------------------

const NO_ENCONTRADO = { error: 'Paciente no encontrado' }

export const crear = async (req, res, next) => {
  try {
    const paciente = await service.crearPaciente(req.body)
    res.status(201).json(paciente)
  } catch (error) {
    next(error)
  }
}

export const listar = async (req, res, next) => {
  try {
    res.json(await service.listarPacientes())
  } catch (error) {
    next(error)
  }
}

export const obtener = async (req, res, next) => {
  try {
    const paciente = await service.buscarPaciente(req.params.id)
    if (!paciente) return res.status(404).json(NO_ENCONTRADO)
    res.json(paciente)
  } catch (error) {
    next(error)
  }
}

export const actualizar = async (req, res, next) => {
  try {
    const paciente = await service.actualizarPaciente(req.params.id, req.body)
    if (!paciente) return res.status(404).json(NO_ENCONTRADO)
    res.json(paciente)
  } catch (error) {
    next(error)
  }
}
