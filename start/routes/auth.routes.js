import { Router } from 'express'
import * as controller from '../controllers/auth.controller.js'

// ---------------------------------------------------------------------------
// CAPA ROUTES — auth. Rutas PÚBLICAS: no llevan el middleware proteger.
// ---------------------------------------------------------------------------

export const authRoutes = Router()

// Registrar un médico = crear el usuario. Devuelve token (queda logueado).
authRoutes.post('/registro', controller.registrar)

// Login: email + password → token.
authRoutes.post('/login', controller.login)
