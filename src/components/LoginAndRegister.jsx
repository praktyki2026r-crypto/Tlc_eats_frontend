import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function LoginAndRegister({ accounts, onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function HandleLogin(){
    if(accounts.some(a => a.email === email)){
      const login = accounts.find(a => a.email === email)
      if(login.password === password)
      {
        onLogin(login)
      }else{
        alert("Niepoprawne hasło!")
      }
    }else{
      alert("Nie ma takiego konta!")
    }
  }

  return(
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
              <button onClick={HandleLogin}>Zaloguj</button>
            </motion.div>
          ):(
            <motion.div
              key='register'
              className='form'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              >
                <h2>Zarejestruj się</h2>
                <input placeholder='Imię i nazwisko' style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }} />
                <input placeholder='E-mail' style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }} />
                <input type="password" placeholder='Hasło' style={{ background: 'linear-gradient(90deg, rgba(226, 142, 244, 1) 0%, rgba(173, 59, 206, 1) 100%)' }} />
                <button>Zarejestruj się</button>
              </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      <motion.div
        className={ isRegister ? 'overlay overlay-active' : 'overlay'}
        animate={{ x: isRegister ? '-100%' : '0%' }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          {isRegister ? (
            <>
              <img src="/images/eats_transparent_background.svg" alt="logo" width={200} />
              <p>Posiadasz już kontro?</p>
              <p>Zaloguj się!</p>
              <button onClick={() => setIsRegister(false)} style={{ background: 'linear-gradient(90deg, rgba(173, 59, 206, 1) 25%, rgba(226, 142, 244, 1) 100%)' }}>Zaloguj się</button>
            </>
          ) : (
            <>
              <img src="/images/eats_transparent_background.svg" alt="logo" width={200} />
              <p>Nie masz konta?</p>
              <p>Dołącz do nas!</p>
              <button onClick={() => setIsRegister(true)}>Zarejestruj się</button>
            </>
          )}
        </motion.div>
    </div>
  )
}

export default LoginAndRegister