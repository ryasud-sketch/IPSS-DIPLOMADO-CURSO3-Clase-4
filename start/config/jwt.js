// ---------------------------------------------------------------------------
// CAPA CONFIG — parámetros del JWT.
// El "secreto" firma los tokens: solo el servidor lo conoce, y con él verifica
// que un token no fue falsificado. En producción va en el .env, nunca en el código.
// ---------------------------------------------------------------------------

export const JWT_SECRET = 'clave-secreta-de-la-clase-4' // ⚠️ SÓLO PARA LA CLASE
export const JWT_EXPIRA = '2h' // el token vence en 2 horas

