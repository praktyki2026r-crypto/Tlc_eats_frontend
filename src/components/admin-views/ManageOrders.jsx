import { useState, useEffect } from "react"
import Banner from "../Banner"
import '../../styles/AdminStyles.css'
import { getActiveOrder, getOrderSummary, closeOrder, updateProfile } from "../../api"

function ManageOrders() {
    const [activeOrder, setActiveOrder] = useState(null)
    const [userOrders, setUserOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [editStartTime, setEditStartTime] = useState('')
    const [editDeadline, setEditDeadline] = useState('')

    useEffect(() => {
        fetchOrder()
    }, [])

    async function fetchOrder() {
        setLoading(true)
        const order = await getActiveOrder()
        if (order && order.id) {
            setActiveOrder(order)
            setEditStartTime(order.start_time?.slice(0, 16) || '')
            setEditDeadline(order.deadline?.slice(0, 16) || '')
            const summary = await getOrderSummary(order.id, 'user')
            if (Array.isArray(summary)) {
                setUserOrders(summary)
            }
        }
        setLoading(false)
    }

    async function HandleCloseOrder() {
        if (!activeOrder) return
        if (!window.confirm('Czy na pewno chcesz zakończyć sesję?')) return
        const result = await closeOrder(activeOrder.id)
        if (result?.message) {
            setSuccessMsg('Sesja zakończona!')
            setActiveOrder(null)
            setUserOrders([])
        } else {
            setError(result?.error || 'Błąd zamykania sesji!')
        }
    }

    function formatDate(dateStr) {
        if (!dateStr) return '-'
        return new Date(dateStr).toLocaleDateString('pl-PL')
    }

    function formatTime(dateStr) {
        if (!dateStr) return '-'
        return new Date(dateStr).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <>
            <Banner />
            <div className="container">
                <div className="orders">
                    <img className="yet-another-image" src="/images/imgettingtiredofnamingthese.svg" alt="" />
                    <h1>Sesja</h1>

                    {loading && <p>Ładowanie...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

                    {!loading && !activeOrder && (
                        <p style={{ opacity: 0.5 }}>Brak aktywnej sesji</p>
                    )}

                    {activeOrder && (
                        <>
                            <div className="date-time">
                                <p>{formatDate(activeOrder.start_time)}</p>
                                <p>{formatTime(activeOrder.start_time)} - {formatTime(activeOrder.deadline)}</p>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Użytkownik</th>
                                        <th>Email</th>
                                        <th>Łączna kwota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrders.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.user}</td>
                                            <td>{element.email}</td>
                                            <td>{element.total} zł</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                <div className="edit-order">
                    <div className="head">
                        <img src="/images/pen-to-square-solid-full.svg" alt="" width={50} />
                        <h1>Edytuj sesję</h1>
                    </div>
                    <div className="form">
                        <label style={{ fontSize: '0.85rem' }}>Czas rozpoczęcia</label>
                        <input
                            type="datetime-local"
                            value={editStartTime}
                            onChange={e => setEditStartTime(e.target.value)}
                        />
                        <label style={{ fontSize: '0.85rem' }}>Deadline</label>
                        <input
                            type="datetime-local"
                            value={editDeadline}
                            onChange={e => setEditDeadline(e.target.value)}
                        />
                        <button onClick={() => setError('Edycja sesji – wkrótce dostępna')}>
                            Edytuj
                        </button>
                    </div>
                    <button onClick={HandleCloseOrder} style={{ background: 'red', color: 'white' }}>
                        Zakończ sesję
                    </button>
                </div>
            </div>
        </>
    )
}

export default ManageOrders