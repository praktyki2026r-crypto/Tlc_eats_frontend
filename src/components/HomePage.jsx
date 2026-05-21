import { NavLink } from "react-router-dom"
import Banner from "./Banner"

function HomePage(){
  return(
    <>
      <Banner />
      <main>
        <img className="background" src="/images/background_dark.svg" alt="background" width={670}/>
        <div className="blob">
          <div className="content">
            <img src="/images/order_banner.svg" alt="order" width={600}/>
            <p>13:00 - 15:00</p>
            <NavLink className="link" to="/order">ZŁÓŻ ZAMÓWIENIE</NavLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage