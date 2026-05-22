import '../../styles/AdminStyles.css'
import Banner from '../Banner'

function CreatingOrders(){
    return(
        <>
            <Banner />
            <div className='co-container'>
                <div className="dark-blob">
                    <div className="form">
                        <h2>Utwórz sesję</h2>
                        <label htmlFor="">Data</label>
                        <input type="date" />
                        <label htmlFor="">Godzina rozpoczęcia</label>
                        <input type="time" />
                        <label htmlFor="">Godzina zakończenia</label>
                        <input type="time" />
                        <button>Rozpocznij <br /> sesję</button>
                    </div>
                </div>
                <img className='the-absolute-image' src="/images/create-orders-blob-icons.svg" alt="" />
                <img className='another-set-of-icons' src="/images/ihavenoideahowtonameit.svg" alt="xd" />
            </div>
        </>
    )
}

export default CreatingOrders