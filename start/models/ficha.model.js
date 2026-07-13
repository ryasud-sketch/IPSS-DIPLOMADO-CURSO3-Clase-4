import mongoose from 'mongoose'

// ---------------------------------------------------------------------------
// CAPA MODELS — la Ficha médica. Referencia a un paciente y a un médico.
// Con populate traemos los datos de ambos (como los encuentros de la clase 3).
// ---------------------------------------------------------------------------

const fichaSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: true,
    },
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medico',
      required: true,
    },
    diagnostico: { type: String, required: true, trim: true },
    tratamiento: { type: String, trim: true },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export const Ficha = mongoose.model('Ficha', fichaSchema, 'fichas')
