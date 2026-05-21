import { useState, useRef } from "react"
import { In_Cart_Product } from "../assets/In_Cart_Product"

function Product_Popup({ product, onClose, onAdd }){
  const [selectedSize, setSelectedSize] = useState(null)
  const noteRef = useRef(null)

  function addProduct(){
    if(!selectedSize){
      alert("Wybierz rozmiar!")
      return
    }

    const order = new In_Cart_Product(product.id, product.name, selectedSize, noteRef.current.value, product.cost)

    onAdd(order)
    onClose()
  }

  return(
    <>
      <div className="overlay-popup" onClick={onClose}></div>
      <div className="wrapper-popup">
        <div className="dawheel-popup"></div>
        <div className="product-popup">
          <button className='close-btn' onClick={onClose}>✕</button>
          <h2>{product.name}</h2>
          <p className='sizes'>Rozmiar:</p>
          <ul>
            {product.sizes.map((element) => (
              <li key={element.id}><input type="radio" name='size' value={element} onChange={() => setSelectedSize(element) }/>{element}</li>
            ))}
          </ul>
          <p className='sizes'>Składniki:</p>
          <ul className='ul-decoration'>
            {product.ingredients.map((element) => (
              <li key={element.id}><p>{element}</p></li>
            ))}
          </ul>
          <p className='sizes'>Personalizacja (wpisać w notatce):</p>
          <ul className='ul-decoration'>
            {product.addons.map((element) => (
              <li key={element.id}>{element}</li>
            ))}
          </ul>
          <p className="sizes">Notatka do zamówienia:</p>
          <textarea className='note' ref={noteRef} />
          <div className='info-popup'>
            <h2>{product.cost} zł</h2>
            <img src="/images/circle-plus-solid-full.svg" alt="plus" width={60} className='showproduct' onClick={addProduct} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Product_Popup