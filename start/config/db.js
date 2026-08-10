import mongoose from 'mongoose'
import dotenv from 'dotenv'

// ---------------------------------------------------------------------------
// CAPA CONFIG — conexión a Mongo.
// ---------------------------------------------------------------------------

dotenv.config()

const MONGODB_URI = 'mongodb+srv://ryasud_db_user:Guachi3597@cluster0.tevi5qi.mongodb.net/?appName=Cluster0'
if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI no está definido. Copia .env.example a .env y configura tu URI de MongoDB.'
  )
}

export const conectar = async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`🍃 clase_4 conectada a MongoDB → base "${mongoose.connection.name}"`)
}
