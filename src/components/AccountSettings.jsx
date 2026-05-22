import { useState } from "react"
import Banner from "./Banner"
import { updateProfile, changePassword, logout } from "../api"

function validateName(value) {
  if (!value.trim()) return 'Pole nie może być puste'
  if (value.trim().length < 2) return 'Minimum 2 znaki'
  if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) return 'Tylko litery'
  return ''
}

function validatePassword(value) {
  if (!value) return 'Pole nie może być puste'
  if (value.length < 8) return 'Minimum 8 znaków'
  if (!/[A-Z]/.test(value)) return 'Wymagana wielka litera'
  if (!/[0-9]/.test(value)) return 'Wymagana cyfra'
  return ''
}

function AccountSettings({ currentUser, onLogOut }) {
  const [firstName, setFirstName] = useState(currentUser?.first_name || '')
  const [lastName, setLastName] = useState(currentUser?.last_name || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [profileMsg, setProfileMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [loading, setLoading] = useState(false)

  function validateProfile() {
    const newErrors = {}
    const firstErr = validateName(firstName)
    const lastErr = validateName(lastName)
    if (firstErr) newErrors.firstName = firstErr
    if (lastErr) newErrors.lastName = lastErr
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function validatePasswordForm() {
    const newErrors = {}
    if (!oldPassword) newErrors.oldPassword = 'Podaj stare hasło'
    const newErr = validatePassword(newPassword)
    if (newErr) newErrors.newPassword = newErr
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function HandleUpdateProfile() {
    if (!validateProfile()) return
    setLoading(true)
    setProfileMsg('')
    const result = await updateProfile({
      first_name: firstName,
      last_name: lastName,
    })
    if (result?.id || result?.email) {
      setProfileMsg(' Dane zaktualizowane!')
    } else {
      setProfileMsg(' Błąd aktualizacji!')
    }
    setLoading(false)
  }

  async function HandleChangePassword() {
    if (!validatePasswordForm()) return
    setLoading(true)
    setPasswordMsg('')
    const result = await changePassword(oldPassword, newPassword)
    if (result?.message) {
      setPasswordMsg('Hasło pomyślnie zmienione!')
      setOldPassword('')
      setNewPassword('')
      setErrors({})
    } else {
      setPasswordMsg('❌ ' + (result?.error || 'Błąd zmiany hasła!'))
    }
    setLoading(false)
  }

  async function HandleLogOut() {
    await logout()
    onLogOut()
  }

  return (
    <>
      <Banner />
      <div className="account-container">
        <div className='edit-account'>
          <div className='account-head'>
            <img src="/images/user-pen-solid-full.svg" alt="user-pen" width={50} />
            <h1>Edytuj użytkownika</h1>
          </div>
          <div className='account-form'>

            <input
              type="text"
              placeholder='Imię'
              value={firstName}
              onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, firstName: '' })) }}
              style={{ borderColor: errors.firstName ? 'red' : '' }}
            />
            {errors.firstName && <p style={{ color: 'red', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{errors.firstName}</p>}

            <input
              type="text"
              placeholder='Nazwisko'
              value={lastName}
              onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, lastName: '' })) }}
              style={{ borderColor: errors.lastName ? 'red' : '' }}
            />
            {errors.lastName && <p style={{ color: 'red', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{errors.lastName}</p>}

            {profileMsg && (
              <p style={{ color: profileMsg.includes('❌') ? 'red' : 'green', fontSize: '0.85rem' }}>
                {profileMsg}
              </p>
            )}
            <button onClick={HandleUpdateProfile} disabled={loading}>
              Edytuj dane
            </button>

            <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />

            <input
              type="password"
              placeholder='Stare hasło'
              value={oldPassword}
              onChange={e => { setOldPassword(e.target.value); setErrors(p => ({ ...p, oldPassword: '' })) }}
              style={{ borderColor: errors.oldPassword ? 'red' : '' }}
            />
            {errors.oldPassword && <p style={{ color: 'red', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{errors.oldPassword}</p>}

            <input
              type="password"
              placeholder='Nowe hasło (min. 8 znaków, wielka litera, cyfra)'
              value={newPassword}
              onChange={e => { setNewPassword(e.target.value); setErrors(p => ({ ...p, newPassword: '' })) }}
              style={{ borderColor: errors.newPassword ? 'red' : '' }}
            />
            {errors.newPassword && <p style={{ color: 'red', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{errors.newPassword}</p>}

            {passwordMsg && (
              <p style={{ color: passwordMsg.includes('❌') ? 'red' : 'green', fontSize: '0.85rem' }}>
                {passwordMsg}
              </p>
            )}
            <button onClick={HandleChangePassword} disabled={loading}>
              Zmień hasło
            </button>
          </div>
        </div>

        <div className='manage-account'>
          <div className="account-head">
            <img src="/images/lightbulb-regular-full.svg" alt="lightbulb" width={50} />
            <h1 style={{ color: 'black' }}>Zarządzaj kontem</h1>
          </div>
          <div className="account-form">
            <p style={{ fontSize: '0.9rem' }}>
              Zalogowany jako: <strong>{currentUser?.email}</strong>
            </p>
            <button onClick={HandleLogOut}>Wyloguj</button>
            <button className='delete'>Usuń konto</button>
            <img src="/images/account-settings-graphic.svg" alt="cos tam" width={450} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSettings