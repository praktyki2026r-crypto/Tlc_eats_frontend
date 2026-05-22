import Banner from "../Banner"
import '../../styles/AdminStyles.css'
import { NavLink } from "react-router-dom"

function AdminMain(){
    return(
        <>
            <Banner />
            <div className="container">
                <div className="left">
                    <h1>Tworzenie zamówień</h1>
                    <NavLink className='link' to='/create-order'>Przejdź</NavLink>
                    <img src="/images/left-icon.svg" alt="" width={200} />
                </div>
                <div className="line-between"></div>
                <div className="right">
                    <h1>Zarządzanie zamówieniami</h1>
                    <NavLink className='link' to='/manage-orders'>Przejdź</NavLink>
                    <img src="/images/right-icon.svg" alt="" width={250} />
                </div>
            </div>
        </>
    )
}

export default AdminMain