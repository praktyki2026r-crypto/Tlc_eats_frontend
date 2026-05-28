import { useState } from "react"
import { getActiveOrder, submitUserOrder } from "../api"

function Cart({ orders, cost, onRemove }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function HandleSubmit() {
    if (orders.length === 0) {
        setError('Koszyk jest pusty!')
        return
    }
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // pobierz aktywne zamówienie grupowe
      const activeOrder = await getActiveOrder()
      if (!activeOrder || activeOrder.message || !activeOrder.id) {
          setError('Brak aktywnego zamówienia grupowego. Poczekaj aż inicjator utworzy sesję.')
          setLoading(false)
          return
      }

      // przygotuj items
      const items = orders.map(order => ({
        menu_item: order.id,
        quantity: 1,
        note: order.note || '',
        selected_options: order.size?.id ? [{ option: order.size.id }] : [],
      }))

      const result = await submitUserOrder(activeOrder.id, items)

      if (result && result.id) {
        setSuccess(true)
        setError('')
      } else {
        setError(result?.error || 'Błąd składania zamówienia!')
      }
    } catch (e) {
      setError('Błąd połączenia z serwerem!')
    }

    setLoading(false)
  }

  return (
    <div className='cart'>
      <div className="cartBanner">
        <img src="/images/cart-shopping-solid-full.svg" alt="cart" width={40} />
        <h1>TWÓJ KOSZYK</h1>
      </div>

      <div className="incartWindow">
        {orders.length === 0 && (
          <p style={{ opacity: 0.5, padding: '1rem' }}>Koszyk jest pusty</p>
        )}
        {orders.map((element, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <p style={{ margin: 0 }}>{element.name}</p>
              {element.size && <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>{element.size}</p>}
              {element.note && <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>Notatka: {element.note}</p>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p style={{ margin: 0 }}>{element.cost} zł</p>
              {onRemove && (
                <button
                  onClick={() => onRemove(index)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: '1rem' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <h1>Podsumowanie: {cost} zł</h1>

      {error && <p style={{ color: 'red', fontSize: '0.85rem', padding: '0 1rem' }}>{error}</p>}
      {success && <p style={{ color: 'green', fontSize: '0.85rem', padding: '0 1rem' }}>Zamówienie złożone!</p>}

      <button onClick={HandleSubmit} disabled={loading}>
        {loading ? 'Składanie...' : 'ZAPŁAĆ'}
      </button>
    </div>
  )
}

export default Cart