import { NavLink } from "react-router-dom"

function Banner(){
  return(
    <header>
      <NavLink className='imglink' to='/'><img src="/images/eats.svg" alt="logo" width={70}/></NavLink>
      <div>
        <NavLink to="/history"><img src="/images/clock-rotate-left-solid-full.svg" alt="history" width={50} /></NavLink>
        <NavLink to="/account"><img src="/images/circle-user-regular-full.svg" alt="account" width={50} /></NavLink>
      </div>
    </header>
  )
}

export default Banner