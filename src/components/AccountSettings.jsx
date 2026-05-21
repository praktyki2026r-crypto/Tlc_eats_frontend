import Banner from "./Banner"

function AccountSettings({ onLogOut }){
  return(
    <>
      <Banner />
      <div className="account-container">
        <div className='edit-account'>
          <div className='account-head'>
            <img src="/images/user-pen-solid-full.svg" alt="user-pen" width={50} />
            <h1>Edytuj użytkownika</h1>
          </div>
          <div className='account-form'>
            <input type="text" placeholder='Imię i nazwisko' />
            <input type="text" placeholder='E-mail'/>
            <input type="text" placeholder='Hasło'/>
            <button>Edytuj dane</button>
          </div>
        </div>
        <div className='manage-account'>
          <div className="account-head">
            <img src="/images/lightbulb-regular-full.svg" alt="lightbulb" width={50} />
            <h1 style={{color:'black'}}>Zarządzaj kontem</h1>
          </div>
          <div className="account-form">
            <button onClick={onLogOut}>Wyloguj</button>
            <button className='delete'>Usuń konto</button>
            <img src="/images/account-settings-graphic.svg" alt="cos tam" width={450}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSettings