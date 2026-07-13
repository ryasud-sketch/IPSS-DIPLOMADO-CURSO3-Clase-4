import mongoose from 'mongoose'

// ---------------------------------------------------------------------------
// CAPA CONFIG — conexión a Mongo.
// ---------------------------------------------------------------------------

// ⚠️ SÓLO PARA LA CLASE. En un proyecto real va en un .env (tarea de la clase 2).
const MONGODB_URI =
  'mongodb+srv://usuario:contraseña@cluster.mongodb.net/clinica?retryWrites=true&w=majority'

export const conectar = async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`🍃 clase_4 conectada a MongoDB → base "${mongoose.connection.name}"`)
}
