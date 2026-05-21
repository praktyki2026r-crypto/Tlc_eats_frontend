import { NavLink } from "react-router-dom"
import Banner from "./Banner"
import { useState, useEffect } from "react"
import { getActiveOrder } from "../api"

function HomePage() {
  const [activeOrder, setActiveOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveOrder()
      .then(data => {
        if (data && data.id) {
          setActiveOrder(data)
        } else {
          setActiveOrder(null)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function formatTime(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <Banner />
      <main>
        <img className="background" src="/images/background_dark.svg" alt="background" width={670} />
        <div className="blob">
          <div className="content">
            <img src="/images/order_banner.svg" alt="order" width={600} />
            {loading ? (
              <p>Ładowanie...</p>
            ) : activeOrder ? (
              <>
                <p>{formatTime(activeOrder.start_time)} - {formatTime(activeOrder.deadline)}</p>
                <NavLink className="link" to="/order">ZŁÓŻ ZAMÓWIENIE</NavLink>
              </>
            ) : (
              <p>Brak zamówienia grupowego</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage