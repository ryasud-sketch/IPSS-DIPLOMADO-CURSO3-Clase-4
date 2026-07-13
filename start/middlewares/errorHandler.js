// ---------------------------------------------------------------------------
// CAPA MIDDLEWARES — manejador central de errores (4 parámetros).
// ---------------------------------------------------------------------------

export const errorHandler = (err, req, res, next) => {
  // Validación de Mongoose → culpa del cliente → 400.
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  // Email o rut duplicado → Mongo lanza error con code 11000.
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un registro con ese dato único' })
  }

  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
}
