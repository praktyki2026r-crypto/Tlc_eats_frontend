import { useState, useEffect } from 'react'
import '../../styles/AdminStyles.css'
import Banner from '../Banner'
import { createOrder, getRestaurants } from '../../api'

function CreatingOrders() {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [restaurantId, setRestaurantId] = useState('')
    const [allRestaurants, setAllRestaurants] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

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
            setError('Wybierz restaurację lub zaznacz wszystkie!')
            return
        }
        if (startTime >= endTime) {
            setError('Godzina zakończenia musi być późniejsza!')
            return
        }
        setLoading(true)
        setError('')
        setSuccess('')

        const startDateTime = `${date}T${startTime}:00`
        const endDateTime = `${date}T${endTime}:00`

        const result = await createOrder(restaurantId, startDateTime, endDateTime, allRestaurants)

        if (result && result.id) {
            setSuccess('Sesja utworzona pomyślnie!')
            setDate('')
            setStartTime('')
            setEndTime('')
            setRestaurantId('')
            setAllRestaurants(false)
        } else {
            setError(result?.error || 'Błąd tworzenia sesji!')
        }
        setLoading(false)
    }

    return (
        <>
            <Banner />
            <div className='co-container'>
                <div className="dark-blob">
                    <div className="form2">
                        <h2>Utwórz sesję</h2>

                        <label>Restauracja</label>
                        <select
                            value={restaurantId}
                            onChange={e => setRestaurantId(e.target.value)}
                            disabled={allRestaurants}
                            style={{ opacity: allRestaurants ? 0.5 : 1 }}
                        >
                            <option value=''>-- Wybierz restaurację --</option>
                            {restaurants.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                            <input
                                type="checkbox"
                                id="allRestaurants"
                                checked={allRestaurants}
                                onChange={e => {
                                    setAllRestaurants(e.target.checked)
                                    if (e.target.checked) setRestaurantId('')
                                }}
                            />
                            <label htmlFor="allRestaurants" style={{ margin: 0 }}>
                                Wszystkie restauracje
                            </label>
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
                        {success && <p style={{ color: 'green', fontSize: '0.85rem' }}>{success}</p>}

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