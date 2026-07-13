import express from 'express'
import cors from 'cors'

import { conectar } from './config/db.js'
import { authRoutes } from './routes/auth.routes.js'
import { pacienteRoutes } from './routes/paciente.routes.js'
import { fichaRoutes } from './routes/ficha.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

// ---------------------------------------------------------------------------
// server.js — ensambla las capas de la API médica.
// ---------------------------------------------------------------------------

const app = express()

app.use(cors()) // el frontend (otro puerto) va a consumir esta API
app.use(express.json())

// Rutas públicas de autenticación (registro de médico + login):
//   POST /auth/registro  → crear médico (queda logueado)
//   POST /auth/login     → iniciar sesión
app.use('/auth', authRoutes)

// Rutas protegidas (exigen JWT):
app.use('/pacientes', pacienteRoutes)
app.use('/fichas', fichaRoutes)

app.use(errorHandler)

const PORT = 3004

await conectar()

app.listen(PORT, () => {
  console.log(`✅ clase_4 → http://localhost:${PORT}`)
})
