import mongoose from 'mongoose'
import dotenv from 'dotenv'

// ---------------------------------------------------------------------------
// CAPA CONFIG — conexión a Mongo.
// ---------------------------------------------------------------------------

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI no está definido. Copia .env.example a .env y configura tu URI de MongoDB.'
  )
}

export const conectar = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log(`🍃 clase_4 conectada a MongoDB → base "${mongoose.connection.name}"`)
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message)
    throw error
  }
}
