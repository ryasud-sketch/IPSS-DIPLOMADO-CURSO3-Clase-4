import mongoose from 'mongoose'

// ---------------------------------------------------------------------------
// CAPA MODELS — el Paciente. Datos básicos, sin credenciales.
// ---------------------------------------------------------------------------


const pacienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    rut: { type: String, required: true, unique: true, trim: true },
    edad: { type: Number, required: true, min: 0, max: 130 },
  },
  { timestamps: true },
)

export const Paciente = mongoose.model('Paciente', pacienteSchema, 'pacientes')
