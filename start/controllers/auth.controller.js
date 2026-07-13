import * as service from '../services/auth.service.js'

// ---------------------------------------------------------------------------
// CAPA CONTROLLERS — auth. Registro y login son las dos rutas PÚBLICAS.
// ---------------------------------------------------------------------------

// POST /medicos/registro — crea el médico (con hash) y devuelve token.
export const registrar = async (req, res, next) => {
  try {
    const { medico, token } = await service.registrar(req.body)
    res.status(201).json({ medico, token })
  } catch (error) {
    next(error)
  }
}

// POST /auth/login — valida credenciales y devuelve token.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const resultado = await service.login(email, password)

    if (!resultado) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    res.json(resultado)
  } catch (error) {
    next(error)
  }
}
