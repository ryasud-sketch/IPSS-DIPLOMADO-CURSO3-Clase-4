import { Router } from 'express'
import * as controller from '../controllers/paciente.controller.js'
import { proteger } from '../middlewares/proteger.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'

// ---------------------------------------------------------------------------
// CAPA ROUTES — pacientes. TODAS protegidas: proteger corre primero.
// Un router.use(proteger) aplica el guard a todas las rutas de este router.
// ---------------------------------------------------------------------------

export const pacienteRoutes = Router()

pacienteRoutes.use(proteger) // 👈 de aquí para abajo, todo exige token

pacienteRoutes.post('/', controller.crear)
pacienteRoutes.get('/', controller.listar)
pacienteRoutes.get('/:id', validarObjectId, controller.obtener)
pacienteRoutes.put('/:id', validarObjectId, controller.actualizar)
