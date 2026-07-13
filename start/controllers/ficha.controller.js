import * as service from '../services/ficha.service.js'

// ---------------------------------------------------------------------------
// CAPA CONTROLLERS — fichas (rutas protegidas por JWT). CRUD completo.
// ---------------------------------------------------------------------------

const NO_ENCONTRADA = { error: 'Ficha no encontrada' }

export const crear = async (req, res, next) => {
  try {
    const ficha = await service.crearFicha(req.body)
    res.status(201).json(ficha)
  } catch (error) {
    next(error)
  }
}

export const listar = async (req, res, next) => {
  try {
    res.json(await service.listarFichas())
  } catch (error) {
    next(error)
  }
}

export const obtener = async (req, res, next) => {
  try {
    const ficha = await service.buscarFicha(req.params.id)
    if (!ficha) return res.status(404).json(NO_ENCONTRADA)
    res.json(ficha)
  } catch (error) {
    next(error)
  }
}

export const editar = async (req, res, next) => {
  try {
    const ficha = await service.editarFicha(req.params.id, req.body)
    if (!ficha) return res.status(404).json(NO_ENCONTRADA)
    res.json(ficha)
  } catch (error) {
    next(error)
  }
}

export const eliminar = async (req, res, next) => {
  try {
    const ficha = await service.eliminarFicha(req.params.id)
    if (!ficha) return res.status(404).json(NO_ENCONTRADA)
    res.json({ mensaje: 'Ficha eliminada', ficha })
  } catch (error) {
    next(error)
  }
}
