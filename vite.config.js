import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // El front del ejercicio (start) — el que trabaja el alumno.
  root: 'start/front',
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
})
