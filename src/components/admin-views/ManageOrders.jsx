import Banner from "../Banner"
import '../../styles/AdminStyles.css'

function ManageOrders({ orders }){
    return(
        <>
            <Banner />
            <div className="container">
                <div className="orders">
                    <img className="yet-another-image" src="/images/imgettingtiredofnamingthese.svg" alt="" />
                    <h1>Sesja</h1>
                    <div className="date-time">
                        <p>11.05.2016</p>
                        <p>11:00-14:00</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Numer zlecenia</th>
                                <th>Status</th>
                                <th>Zmień status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((element) => (
                                    <tr>
                                        <td>{element.order_number}</td>
                                        <td>{element.status}</td>
                                        <td><img src="/images/circle-xmark-regular-full.svg" alt="x" width={50} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="edit-order">
                    <div className="head">
                        <img src="/images/pen-to-square-solid-full.svg" alt="" width={50} />
                        <h1>Edytuj sesję</h1>
                    </div>
                    <div className="form">
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <button>Edytuj</button>
                    </div>
                    <button>Zakończ sesję</button>
                </div>
            </div>
        </>
    )
}

export default ManageOrders