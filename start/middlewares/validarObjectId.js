import mongoose from 'mongoose'

// ---------------------------------------------------------------------------
// CAPA MIDDLEWARES — valida que el :id de la URL tenga formato de ObjectId,
// antes de que findById lance una excepción. (Igual que en la clase 3.)
// ---------------------------------------------------------------------------

export const validarObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: 'Id inválido' })
  }
  next()
}
