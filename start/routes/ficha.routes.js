import { Router } from 'express'
import * as controller from '../controllers/ficha.controller.js'
import { proteger } from '../middlewares/proteger.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'

// ---------------------------------------------------------------------------
// CAPA ROUTES — fichas. CRUD completo, todo protegido por JWT.
// ---------------------------------------------------------------------------

export const fichaRoutes = Router()

fichaRoutes.use(proteger)

fichaRoutes.post('/', controller.crear)
fichaRoutes.get('/', controller.listar)
fichaRoutes.get('/:id', validarObjectId, controller.obtener)
fichaRoutes.put('/:id', validarObjectId, controller.editar)
fichaRoutes.delete('/:id', validarObjectId, controller.eliminar)
