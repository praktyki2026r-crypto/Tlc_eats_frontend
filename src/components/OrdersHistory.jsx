import { useState, useEffect } from "react"
import Banner from "./Banner"
import { getUserOrderHistory } from "../api"

function OrdersHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getUserOrderHistory()
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data)
        } else {
          setError('Błąd pobierania historii')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Banner />
      <div className="history-container">
        <div>
          <h1>Historia zamówień</h1>

          {loading && <p>Ładowanie...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && orders.length === 0 && (
            <p style={{ opacity: 0.5 }}>Brak historii zamówień</p>
          )}

          {orders.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Numer zamówienia</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Dania</th>
                  <th>Cena</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(userOrder => (
                  <tr key={userOrder.id}>
                    <td>{userOrder.id}</td>
                    <td>{userOrder.order?.deadline
                      ? new Date(userOrder.order.deadline).toLocaleDateString('pl-PL')
                      : '-'}
                    </td>
                    <td>{userOrder.status}</td>
                    <td>
                      {userOrder.items?.map(item => (
                        <p key={item.id} style={{ margin: 0, fontSize: '0.85rem' }}>
                          {item.menu_item} x{item.quantity}
                        </p>
                      ))}
                    </td>
                    <td>{userOrder.total} zł</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <img src="/images/orders-histiory-graphic.svg" alt="graphic" height={600} />
      </div>
    </>
  )
}

export default OrdersHistory