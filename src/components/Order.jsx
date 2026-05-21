import Banner from "./Banner"
import Cart from "./Cart"
import ProductsList from "./ProductsList"
import { useState } from "react"

function Order({ currentUser }) {
  const [orders, setOrders] = useState([])
  const cost = orders.reduce((sum, el) => sum + el.cost, 0)

  function addToOrders(order) {
    setOrders(prev => [...prev, order])
  }

  function removeFromOrders(index) {
    setOrders(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <Banner />
      <div className='orderPage'>
        <ProductsList onAdd={addToOrders} />
        <Cart orders={orders} cost={cost} onRemove={removeFromOrders} />
      </div>
    </>
  )
}

export default Order