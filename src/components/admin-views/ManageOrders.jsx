import { useState, useEffect } from "react"
import Banner from "../Banner"
import '../../styles/AdminStyles.css'
import { getActiveOrder, getOrderSummary, closeOrder, updateOrder, getRestaurants } from "../../api"

function ManageOrders() {
    const [activeOrder, setActiveOrder] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [editDate, setEditDate] = useState('')
    const [editStartTime, setEditStartTime] = useState('')
    const [editEndTime, setEditEndTime] = useState('')
    const [editStatus, setEditStatus] = useState('')

    useEffect(() => {
        fetchOrder()
    }, [])

    async function fetchOrder() {
        setLoading(true)
        const [order, restaurantsData] = await Promise.all([
            getActiveOrder(),
            getRestaurants()
        ])
        if (order && order.id) {
            setActiveOrder(order)
            const date = order.start_time?.slice(0, 10) || ''
            const start = order.start_time?.slice(11, 16) || ''
            const end = order.deadline?.slice(11, 16) || ''
            setEditDate(date)
            setEditStartTime(start)
            setEditEndTime(end)
            setEditStatus(order.status)
        }
        if (Array.isArray(restaurantsData)) {
            setRestaurants(restaurantsData)
        }
        setLoading(false)
    }

    async function HandleEditOrder() {
        if (!activeOrder) return
        if (!editDate || !editStartTime || !editEndTime) {
            setError('Uzupełnij wszystkie pola!')
            return
        }
        if (editStartTime >= editEndTime) {
            setError('Godzina zakończenia musi być późniejsza!')
            return
        }
        setError('')
        const result = await updateOrder(activeOrder.id, {
            start_time: `${editDate}T${editStartTime}:00`,
            deadline: `${editDate}T${editEndTime}:00`,
        })
        if (result && result.id) {
            setSuccessMsg('Sesja zaktualizowana!')
            setActiveOrder(result)
        } else {
            setError(result?.error || 'Błąd edycji sesji!')
        }
    }

    async function HandleCloseOrder() {
        if (!activeOrder) return
        if (!window.confirm('Czy na pewno chcesz zakończyć sesję?')) return
        const result = await closeOrder(activeOrder.id)
        if (result?.message) {
            setSuccessMsg('Sesja zakończona!')
            setActiveOrder(null)
            setRestaurants([])
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

    // filtruj restauracje po aktywnym zamówieniu
    const visibleRestaurants = activeOrder?.all_restaurants
        ? restaurants
        : restaurants.filter(r => r.id === activeOrder?.restaurant)

    return (
        <>
            <Banner />
            <div className="mo-container">
                <div className="mo-left">
                    <h1 className="mo-title">Zamówienie</h1>

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

                            <table className="mo-table">
                                <thead>
                                    <tr>
                                        <th>Restauracja</th>
                                        <th>Status</th>
                                        <th>Numer telefonu</th>
                                        <th>Złożone zamówienia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleRestaurants.map((r, index) => (
                                        <tr key={index}>
                                            <td>{r.name}</td>
                                            <td>-</td>
                                            <td>{r.phone || 'brak'}</td>
                                            <td>-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                <div className="mo-right">
                    <div className="mo-head">
                        <img src="/images/pen-to-square-solid-full.svg" alt="" width={40} />
                        <h2>Edytuj zamówienie</h2>
                    </div>
                    <div className="mo-form">
                        <input
                            type="date"
                            value={editDate}
                            onChange={e => setEditDate(e.target.value)}
                            placeholder="Data"
                        />
                        <input
                            type="time"
                            value={editStartTime}
                            onChange={e => setEditStartTime(e.target.value)}
                            placeholder="Godzina rozpoczęcia"
                        />
                        <input
                            type="time"
                            value={editEndTime}
                            onChange={e => setEditEndTime(e.target.value)}
                            placeholder="Godzina zakończenia"
                        />
                        <input
                            type="text"
                            placeholder="Status zamówienia"
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                        />
                        <button className="mo-btn-edit" onClick={HandleEditOrder}>
                            Edytuj
                        </button>
                        <button className="mo-btn-close" onClick={HandleCloseOrder}>
                            ZAKOŃCZ ZAMÓWIENIE
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageOrders