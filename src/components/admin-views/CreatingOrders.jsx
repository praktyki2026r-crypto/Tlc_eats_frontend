import '../../styles/AdminStyles.css'
import Banner from '../Banner'

function CreatingOrders(){
    return(
        <>
            <Banner />
            <div className='co-container'>
                <div className="dark-blob">
                    <div className="content">
                        <h2>Utwórz zamówienie</h2>
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <button></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatingOrders