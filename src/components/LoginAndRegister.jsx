import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { login, register, getMe } from "../api"

function LoginAndRegister({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function HandleLogin() {
    if (!email || !password) {
      setError('Uzupełnij wszystkie pola!')
      return
    }
    setLoading(true)
    setError('')
    const { ok, data } = await login(email, password)
    if (ok) {
      const user = await getMe()
      onLogin(user)
    } else {
      setError(data?.non_field_errors?.[0] || 'Niepoprawny email lub hasło!')
    }
    setLoading(false)
  }

  async function HandleRegister() {
    if (!firstName || !lastName || !email || !password || !password2) {
      setError('Uzupełnij wszystkie pola!')
      return
    }
    if (password !== password2) {
      setError('Hasła nie są identyczne!')
      return
    }
    setLoading(true)
    setError('')
    const { ok, data } = await register(firstName, lastName, email, password, password2)
    if (ok) {
      const user = await getMe()
      onLogin(user)
    } else {
      setError(
        data?.email?.[0] ||
        data?.non_field_errors?.[0] ||
        'Błąd rejestracji!'
      )
    }
    setLoading(false)
  }

  return (
    <div className='container'>
      <motion.div
        className="forms"
        animate={{ x: isRegister ? '25%' : '-25%' }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      >
        <AnimatePresence mode='wait'>
          {!isRegister ? (
            <motion.div
              key="login"
              className='form'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Zaloguj się</h2>
              {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
              <input
                placeholder='E-mail'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder='Hasło'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={HandleLogin} disabled={loading}>
                {loading ? 'Logowanie...' : 'Zaloguj'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key='register'
              className='form'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Zarejestruj się</h2>
              {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
              <input
                placeholder='Imię'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }}
              />
              <input
                placeholder='Nazwisko'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }}
              />
              <input
                placeholder='E-mail'
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }}
              />
              <input
                type="password"
                placeholder='Hasło'
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }}
              />
              <input
                type="password"
                placeholder='Powtórz hasło'
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }}
              />
              <button onClick={HandleRegister} disabled={loading}>
                {loading ? 'Rejestracja...' : 'Zarejestruj się'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={isRegister ? 'overlay overlay-active' : 'overlay'}
        animate={{ x: isRegister ? '-100%' : '0%' }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        {isRegister ? (
          <>
            <img src="/images/eats_transparent_background.svg" alt="logo" width={200} />
            <p>Posiadasz już konto?</p>
            <p>Zaloguj się!</p>
            <button
              onClick={() => { setIsRegister(false); setError('') }}
              style={{ background: 'linear-gradient(90deg, rgba(173, 59, 206, 1) 25%, rgba(226, 142, 244, 1) 100%)' }}
            >
              Zaloguj się
            </button>
          </>
        ) : (
          <>
            <img src="/images/eats_transparent_background.svg" alt="logo" width={200} />
            <p>Nie masz konta?</p>
            <p>Dołącz do nas!</p>
            <button onClick={() => { setIsRegister(true); setError('') }}>
              Zarejestruj się
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default LoginAndRegister