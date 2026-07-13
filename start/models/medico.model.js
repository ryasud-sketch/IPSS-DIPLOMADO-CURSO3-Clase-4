import mongoose from 'mongoose'
// Para el hash de la contraseña usaremos bcrypt:
// import bcrypt from 'bcryptjs'

// ---------------------------------------------------------------------------
// CAPA MODELS — el Médico. Además de sus datos, es el USUARIO que inicia sesión:
// tiene email y password. La password NUNCA se guarda en texto plano.
// ---------------------------------------------------------------------------

const medicoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    especialidad: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true },
)

// ---------------------------------------------------------------------------
// TODO — proteger la contraseña:
//   1. Hook pre('save') que hashea la password con bcrypt ANTES de guardar
//      (solo si cambió: this.isModified('password')).
//   2. Método compararPassword(passwordPlano) que usa bcrypt.compare.
//   3. Método toJSON() que elimina la password de las respuestas.
// ---------------------------------------------------------------------------

export const Medico = mongoose.model('Medico', medicoSchema, 'medicos')
