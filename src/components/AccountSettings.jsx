import { useState } from "react"
import Banner from "./Banner"
import { updateProfile, changePassword, logout } from "../api"

function AccountSettings({ currentUser, onLogOut }) {
  const [firstName, setFirstName] = useState(currentUser?.first_name || '')
  const [lastName, setLastName] = useState(currentUser?.last_name || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [profileMsg, setProfileMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function HandleUpdateProfile() {
    setLoading(true)
    setProfileMsg('')
    const result = await updateProfile({
      first_name: firstName,
      last_name: lastName,
    })
    if (result?.id) {
      setProfileMsg('Dane zaktualizowane!')
    } else {
      setProfileMsg('Błąd aktualizacji!')
    }
    setLoading(false)
  }

  async function HandleChangePassword() {
    if (!oldPassword || !newPassword) {
      setPasswordMsg('Uzupełnij wszystkie pola!')
      return
    }
    setLoading(true)
    setPasswordMsg('')
    const result = await changePassword(oldPassword, newPassword)
    if (result?.message) {
      setPasswordMsg('Hasło zmienione!')
      setOldPassword('')
      setNewPassword('')
    } else {
      setPasswordMsg(result?.error || 'Błąd zmiany hasła!')
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
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder='Nazwisko'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            {profileMsg && (
              <p style={{ color: profileMsg.includes('Błąd') ? 'red' : 'green', fontSize: '0.85rem' }}>
                {profileMsg}
              </p>
            )}
            <button onClick={HandleUpdateProfile} disabled={loading}>
              Edytuj dane
            </button>

            <input
              type="password"
              placeholder='Stare hasło'
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              style={{ marginTop: '1rem' }}
            />
            <input
              type="password"
              placeholder='Nowe hasło'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            {passwordMsg && (
              <p style={{ color: passwordMsg.includes('Błąd') ? 'red' : 'green', fontSize: '0.85rem' }}>
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