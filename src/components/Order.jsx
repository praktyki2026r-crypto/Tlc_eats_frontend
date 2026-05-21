import Banner from "./Banner"
import Cart from "./Cart"
import ProductsList from "./ProductsList"
import { useState } from "react"

function Order(){
  const [orders, setOrders] = useState([])
  const cost = orders.reduce((sum, el) => sum + el.cost, 0)

  function addToOrders(order){
    setOrders(prev => [...prev, order])
  }

  return(
    <>
      <Banner />
      <div className='orderPage'>
        <ProductsList onAdd={addToOrders} />
        <Cart orders={orders} cost={cost} />
      </div>
    </>
  )
}

export default Order