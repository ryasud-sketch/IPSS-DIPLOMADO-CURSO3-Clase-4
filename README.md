# Clase 4 — CRUD y autenticación (API médica)

> Sesión 13 · 30-07-2026 · API en el puerto `3004` · frontend en el `5174`
> Diplomado IPS · Módulo 3 — Backend y APIs REST.

## Cómo obtener este repositorio

Tienes dos opciones. **Si solo quieres seguir la clase, clona.** Si además quieres
conservar tu propia copia en tu cuenta de GitHub (con tus cambios, tus commits y tu
historial), haz un **fork** primero.

### Opción A — Clonar (lo más rápido)

```bash
git clone https://github.com/ivandress/IPSS-DIPLOMADO-CURSO3-Clase-4.git
cd IPSS-DIPLOMADO-CURSO3-Clase-4
npm install
```

> Podrás trabajar en local, pero **no** subir cambios: este repositorio es la fuente del
> curso y está restringido al profesor.

### Opción B — Fork (para tener tu copia y poder subir tus cambios)

1. Arriba a la derecha, haz clic en **Fork**. Eso crea una copia en **tu** cuenta.
2. Clona **tu fork** (no este):

```bash
git clone https://github.com/TU-USUARIO/IPSS-DIPLOMADO-CURSO3-Clase-4.git
cd IPSS-DIPLOMADO-CURSO3-Clase-4
npm install
```

Ahí sí puedes hacer `commit` y `push` de tu trabajo.

## Cómo levantarla

```bash
npm run dev        # API en 3004 + frontend Vite en 5174
```

## Qué hay en este repositorio

- **`start/`** — el punto de partida de la clase. **Aquí trabajas tú.**

Lee el detalle de la clase en [`start/README.md`](start/README.md).

## Requisitos

- **Node.js 20+**
- **MongoDB Atlas**: copia `.env.example` como `.env` y reemplaza la URL por la de tu
  clúster. El `.env` **no se sube** al repositorio (está en el `.gitignore`).

```bash
cp .env.example .env
```
