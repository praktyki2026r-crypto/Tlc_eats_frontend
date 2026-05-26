import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/AdminStyles.css'
import Banner from '../Banner'
import { createOrder, getRestaurants } from '../../api'

function CreatingOrders() {
    const navigate = useNavigate()
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [restaurantId, setRestaurantId] = useState('')
    const [allRestaurants, setAllRestaurants] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const selectedLabel = allRestaurants
        ? 'Wszystkie restauracje'
        : restaurants.find(r => r.id == restaurantId)?.name || 'Wybierz restaurację'

    useEffect(() => {
        getRestaurants().then(data => {
            if (Array.isArray(data)) setRestaurants(data)
            else setError('Błąd pobierania restauracji')
        })
    }, [])

    async function HandleCreateOrder() {
        if (!date || !startTime || !endTime) {
            setError('Uzupełnij wszystkie pola!')
            return
        }
        if (!allRestaurants && !restaurantId) {
            setError('Wybierz restaurację!')
            return
        }
        if (startTime >= endTime) {
            setError('Godzina zakończenia musi być późniejsza!')
            return
        }
        setLoading(true)
        setError('')
        const startDateTime = `${date}T${startTime}:00`
        const endDateTime = `${date}T${endTime}:00`
        const result = await createOrder(restaurantId, startDateTime, endDateTime, allRestaurants)
        if (result && result.id) {
            navigate('/manage-orders')
        } else {
            setError(result?.error || 'Błąd tworzenia sesji!')
            setLoading(false)
        }
    }

    return (
        <>
            <Banner />
            <div className='co-container'>
                <div className="dark-blob">
                    <div className="form2">
                        <h2>Utwórz sesję</h2>

                        <label>Restauracja</label>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <div
                                onClick={() => setDropdownOpen(p => !p)}
                                style={{
                                    fontFamily: 'inherit',
                                    padding: '15px 10px',
                                    borderRadius: '15px',
                                    background: '#dfdde5',
                                    color: '#3c3c3c',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                {selectedLabel} ▼
                            </div>
                            {dropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    background: '#dfdde5',
                                    borderRadius: '10px',
                                    maxHeight: '175px',
                                    overflowY: 'auto',
                                    zIndex: 10,
                                }}>
                                    <div
                                        onClick={() => { setRestaurantId(''); setAllRestaurants(false); setDropdownOpen(false) }}
                                        style={{ padding: '10px 15px', cursor: 'pointer' }}
                                    >
                                        Wybierz restaurację
                                    </div>
                                    <div
                                        onClick={() => { setAllRestaurants(true); setRestaurantId(''); setDropdownOpen(false) }}
                                        style={{ padding: '10px 15px', cursor: 'pointer' }}
                                    >
                                        Wszystkie restauracje
                                    </div>
                                    {[...restaurants]
                                        .sort((a, b) => a.name.localeCompare(b.name, 'pl'))
                                        .map(r => (
                                            <div
                                                key={r.id}
                                                onClick={() => { setRestaurantId(r.id); setAllRestaurants(false); setDropdownOpen(false) }}
                                                style={{ padding: '10px 15px', cursor: 'pointer' }}
                                            >
                                                {r.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>

                        <label>Data</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />

                        <label>Godzina rozpoczęcia</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                        />

                        <label>Godzina zakończenia</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                        />

                        {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}

                        <button onClick={HandleCreateOrder} disabled={loading}>
                            {loading ? 'Tworzenie...' : 'Rozpocznij sesję'}
                        </button>
                    </div>
                </div>
                <img className='the-absolute-image' src="/images/create-orders-blob-icons.svg" alt="" />
                <img className='another-set-of-icons' src="/images/ihavenoideahowtonameit.svg" alt="xd" />
            </div>
        </>
    )
}

export default CreatingOrders