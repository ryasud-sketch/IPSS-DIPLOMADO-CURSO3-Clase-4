import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // El front de la solución (final) — solo en la máquina del profesor.
  root: 'final/front',
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
})
