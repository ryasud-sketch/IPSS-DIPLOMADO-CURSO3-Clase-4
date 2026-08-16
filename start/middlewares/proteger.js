// Para verificar el token usaremos jwt y el secreto:
 import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt.js'

// ---------------------------------------------------------------------------
// CAPA MIDDLEWARES — el guardia de las rutas protegidas.
// Corre ANTES del controller. Si el token es válido, deja pasar; si no, corta.
// ---------------------------------------------------------------------------

export const proteger = (req, res, next) => {
  // ---------------------------------------------------------------------------
  // TODO — verificar el token JWT:
  //   1. Leer el header "Authorization: Bearer <token>".
  //   2. Si falta o no empieza con "Bearer ", responder 401.
  //   3. Extraer el token (después de "Bearer ").
  //   4. jwt.verify(token, JWT_SECRET) → guardar el payload en req.medico.
  //   5. Si verify lanza (token alterado/expirado), responder 401.
  //   6. Si todo bien, next().
  // ---------------------------------------------------------------------------
const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Falta el token' })
  }

  const token = header.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.medico = payload
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}


