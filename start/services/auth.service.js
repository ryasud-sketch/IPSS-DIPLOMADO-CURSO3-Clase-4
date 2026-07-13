// Para el token usaremos jwt y la config:
// import jwt from 'jsonwebtoken'
import { Medico } from '../models/medico.model.js'
// import { JWT_SECRET, JWT_EXPIRA } from '../config/jwt.js'

// ---------------------------------------------------------------------------
// CAPA SERVICES — la lógica de autenticación.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TODO — helper para firmar el token:
//   const firmarToken = (medico) =>
//     jwt.sign({ id: medico._id, email: medico.email }, JWT_SECRET, { expiresIn: JWT_EXPIRA })
// ---------------------------------------------------------------------------

// REGISTRO: crear el médico (el hash lo hará el modelo) y devolver un token.
export const registrar = async (datos) => {
  const medico = await Medico.create(datos)

  // TODO: firmar el token y devolverlo junto al médico.
  // const token = firmarToken(medico)
  // return { medico, token }
  return { medico, token: null }
}

// LOGIN: buscar por email, comparar la password, y si calza, firmar el token.
export const login = async (email, password) => {
  const medico = await Medico.findOne({ email })
  if (!medico) return null

  // TODO: comparar la password recibida con el hash guardado.
  // const coincide = await medico.compararPassword(password)
  // if (!coincide) return null

  // TODO: firmar el token y devolverlo.
  // const token = firmarToken(medico)
  // return { medico, token }
  return { medico, token: null }
}
