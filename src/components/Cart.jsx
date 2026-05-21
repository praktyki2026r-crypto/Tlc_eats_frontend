function Cart({ orders, cost }){
  return(
    <div className='cart'>
      <div className="cartBanner">
        <img src="/images/cart-shopping-solid-full.svg" alt="cart" width={40} />
        <h1>TWÓJ KOSZYK</h1>
      </div>
      <div className="incartWindow">
        {orders.map((element) => (
          <p key={element.id} style={{marginBottom:'15px'}}>{element.name} {element.cost} zł</p>
        ))}
      </div>
      <h1>Podsumowanie: {cost} zł</h1>
      <button>ZAPŁAĆ</button>
    </div>
  )
}

export default Cart