import { useState, useEffect } from "react"
import Banner from "../Banner"
import '../../styles/AdminStyles.css'
import { getActiveOrder, closeOrder, updateOrder, getRestaurants } from "../../api"

function ManageOrders() {
    const [activeOrder, setActiveOrder] = useState(null)
    const [lastOrder, setLastOrder] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [editDate, setEditDate] = useState('')
    const [editStartTime, setEditStartTime] = useState('')
    const [editEndTime, setEditEndTime] = useState('')
    const [sessionClosed, setSessionClosed] = useState(false)

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
            setLastOrder(order)
            setEditDate(order.start_time?.slice(0, 10) || '')
            setEditStartTime(order.start_time?.slice(11, 16) || '')
            setEditEndTime(order.deadline?.slice(11, 16) || '')
        }
        if (Array.isArray(restaurantsData)) setRestaurants(restaurantsData)
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
        setSuccessMsg('')
        const result = await updateOrder(activeOrder.id, {
            start_time: `${editDate}T${editStartTime}:00`,
            deadline: `${editDate}T${editEndTime}:00`,
        })
        if (result && result.id) {
            setSuccessMsg('Sesja zaktualizowana!')
            setActiveOrder(result)
            setLastOrder(result)
        } else {
            setError(result?.error || 'Błąd edycji sesji!')
        }
    }

    async function HandleCloseOrder() {
        if (!window.confirm('Czy na pewno chcesz zakończyć sesję?')) return
        if (!activeOrder) {
            // sesja już zamknięta – czyścimy widok
            setLastOrder(null)
            setSessionClosed(false)
            return
        }
        const result = await closeOrder(activeOrder.id)
        if (result?.message) {
            setSuccessMsg('Sesja zakończona!')
            setSessionClosed(true)
            setActiveOrder(null)
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

    // wyświetlaj aktywne zamówienie lub ostatnie (gdy sesja zamknięta)
    const displayOrder = activeOrder || lastOrder

    const visibleRestaurants = displayOrder?.all_restaurants
        ? restaurants
        : restaurants.filter(r => r.id === displayOrder?.restaurant)

    function getDeliveryStatus(status) {
        switch (status) {
            case 'collecting': return 'Zbieranie zamówień'
            case 'in_progress': return 'W trakcie realizacji'
            case 'in_delivery': return 'W trakcie dostawy'
            case 'delivered': return 'Dostarczone'
            default: return 'Zbieranie zamówień'
        }
    }

    return (
        <>
            <Banner />
            <div className="mo-container">
                <div className="mo-left">
                    <h1 className="mo-title">Zamówienie</h1>

                    {loading && <p>Ładowanie...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
                    {sessionClosed && (
                        <p style={{ color: '#862c9e', fontSize: '0.9rem' }}>
                            Sesja zakończona – widok ostatniej sesji
                        </p>
                    )}

                    {!loading && !displayOrder && (
                        <p style={{ opacity: 0.5 }}>Brak aktywnej sesji</p>
                    )}

                    {displayOrder && (
                        <>
                            <div className="date-time">
                                <p>{formatDate(displayOrder.start_time)}</p>
                                <p>{formatTime(displayOrder.start_time)} - {formatTime(displayOrder.deadline)}</p>
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
                                    {visibleRestaurants.length === 0 && (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', opacity: 0.5 }}>
                                                Brak danych
                                            </td>
                                        </tr>
                                    )}
                                    {visibleRestaurants.map((r, index) => (
                                        <tr key={index}>
                                            <td>{r.name}</td>
                                            <td>{getDeliveryStatus(displayOrder?.delivery_status)}</td>
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
                            disabled={sessionClosed}
                        />
                        <input
                            type="time"
                            value={editStartTime}
                            onChange={e => setEditStartTime(e.target.value)}
                            disabled={sessionClosed}
                        />
                        <input
                            type="time"
                            value={editEndTime}
                            onChange={e => setEditEndTime(e.target.value)}
                            disabled={sessionClosed}
                        />

                        {!sessionClosed && (
                            <button className="mo-btn-edit" onClick={HandleEditOrder}>
                                Edytuj
                            </button>
                        )}

                        <button className="mo-btn-close" onClick={HandleCloseOrder}>
                            {sessionClosed ? 'WYCZYŚĆ WIDOK' : 'ZAKOŃCZ ZAMÓWIENIE'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageOrders