# Clase 4 — CRUD y autenticación (API médica)

> Sesión 13 · 30-07-2026 · API en el puerto `3004` · frontend en el `5174`

Una **clínica**: médicos que inician sesión, pacientes y fichas médicas. Sobre la
arquitectura en capas que ya conoces, le agregas **autenticación** de verdad.

## Cómo levantarla

```bash
yarn dev:clase_4   # API en 3004 + frontend en 5174
```

Al arrancar puedes registrar un médico y crear pacientes, pero la API **todavía no
es segura**: cualquiera entra sin credenciales. Eso es lo que vas a resolver.

## Qué vas a construir

Todo en el **backend** (este es un curso de backend), en este orden:

**1. Hashear la contraseña** — `models/medico.model.js`
La password no puede guardarse en texto plano. Agrega un hook `pre('save')` que la
cifre con **bcrypt** antes de guardar, un método para comparar contraseñas en el
login, y otro que la oculte de las respuestas.

**2. Emitir un token JWT** — `services/auth.service.js`
Al registrarse e iniciar sesión, firma un **JWT** y devuélvelo al cliente. El login
primero compara la contraseña (con lo del paso 1) y, si calza, entrega el token.

**3. Proteger las rutas** — `middlewares/proteger.js`
Escribe el middleware que lee el token del header `Authorization: Bearer`, lo
verifica, y deja pasar solo si es válido (si no, `401`).

## El frontend

La carpeta `front/` es una interfaz —login y fichas— para **probar tu API**. Trae
un **toggle** (arriba a la derecha) que alterna entre datos locales (`fakeApi`) y
la API real en el `3004`: así puedes ver la interfaz andando aunque el backend aún
esté a medias. No necesitas modificarla.
