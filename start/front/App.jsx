import { useState, useEffect } from 'react'
import { api, estaEnModoFake, alternarModo } from './api.js'

// ---------------------------------------------------------------------------
// La app en React. La UI son componentes; la lógica de datos sigue viviendo en
// api.js (que decide entre fakeApi y la API real). Los componentes solo llaman
// api.login(), api.crearFicha(), etc. — no saben qué hay detrás.
// ---------------------------------------------------------------------------

export function App() {
  // El médico logueado. null = todavía en la pantalla de login.
  const [medico, setMedico] = useState(null)

  if (!medico) return <Login onEntrar={setMedico} />
  return <Panel medico={medico} onSalir={() => { api.salir(); setMedico(null) }} />
}

// --- El toggle fake / real (arriba a la derecha) ---
function Toggle() {
  const fake = estaEnModoFake()
  return (
    <div className="modo">
      <span>Origen de datos:</span>
      <button
        className={'chip' + (fake ? ' fake' : '')}
        onClick={() => { alternarModo(); location.reload() }}
      >
        {fake ? '🧪 fakeApi (local)' : '🌐 API real (3004)'}
      </button>
    </div>
  )
}

// --- Pantalla de login / registro ---
function Login({ onEntrar }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const entrar = async (e) => {
    e.preventDefault()
    try {
      onEntrar(await api.login(email, password))
    } catch (err) {
      setMsg(err.message)
    }
  }

  const registrar = async () => {
    if (!email || !password) return setMsg('Completa email y contraseña.')
    try {
      onEntrar(await api.registrar({
        nombre: email.split('@')[0], especialidad: 'General', email, password,
      }))
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <>
      <Toggle />
      <main className="tarjeta">
        <h1>Clínica · Ingreso</h1>
        <p className="pista">Regístrate como médico o inicia sesión.</p>
        <form onSubmit={entrar}>
          <label>Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <div className="fila">
            <button type="submit">Entrar</button>
            <button type="button" className="secundario" onClick={registrar}>Registrarme</button>
          </div>
        </form>
        {msg && <p className="error">{msg}</p>}
      </main>
    </>
  )
}

// --- Panel de fichas ---
function Panel({ medico, onSalir }) {
  const [pacientes, setPacientes] = useState([])
  const [fichas, setFichas] = useState([])
  const [msg, setMsg] = useState('')

  // Carga los datos al montar el componente (y cuando pidamos recargar).
  const cargar = async () => {
    try {
      setPacientes(await api.listarPacientes())
      setFichas(await api.listarFichas())
    } catch (err) {
      setMsg(err.message)
    }
  }
  useEffect(() => { cargar() }, [])

  const crear = async (datos) => {
    try { await api.crearFicha(datos); cargar() } catch (err) { setMsg(err.message) }
  }
  const eliminar = async (id) => {
    try { await api.eliminarFicha(id); cargar() } catch (err) { setMsg(err.message) }
  }

  return (
    <>
      <Toggle />
      <main className="panel">
        <header className="panel-top">
          <div>
            <h1>Fichas médicas</h1>
            <p className="pista">{medico.nombre} · {medico.especialidad}</p>
          </div>
          <button className="secundario" onClick={onSalir}>Salir</button>
        </header>

        <FormFicha pacientes={pacientes} onCrear={crear} />

        <ul className="lista">
          {fichas.map((f) => (
            <li key={f._id}>
              <div>
                <b>{f.paciente?.nombre ?? '—'}</b> · {f.diagnostico}
                <span className="tenue">{f.medico?.especialidad ?? ''}</span>
              </div>
              <button className="borrar" onClick={() => eliminar(f._id)}>🗑</button>
            </li>
          ))}
        </ul>
        {msg && <p className="error">{msg}</p>}
      </main>
    </>
  )
}

function FormFicha({ pacientes, onCrear }) {
  const [paciente, setPaciente] = useState('')
  const [diagnostico, setDiagnostico] = useState('')
  const [tratamiento, setTratamiento] = useState('')

  // Selecciona el primer paciente por defecto cuando llega la lista.
  useEffect(() => { if (pacientes[0]) setPaciente(pacientes[0]._id) }, [pacientes])

  const enviar = (e) => {
    e.preventDefault()
    onCrear({ paciente, diagnostico, tratamiento })
    setDiagnostico(''); setTratamiento('')
  }

  return (
    <form className="form-ficha" onSubmit={enviar}>
      <select value={paciente} onChange={(e) => setPaciente(e.target.value)} required>
        {pacientes.map((p) => <option key={p._id} value={p._id}>{p.nombre}</option>)}
      </select>
      <input placeholder="Diagnóstico" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} required />
      <input placeholder="Tratamiento" value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} />
      <button type="submit">Crear ficha</button>
    </form>
  )
}
