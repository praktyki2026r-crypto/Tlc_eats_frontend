import Show_Products from "./ShowProducts"
import Product_Popup from "./ProductPopup"
import { useState } from "react"

function ProductsList({ onAdd }){
  const [selectedProduct, setSelectedProduct] = useState(null)

  return(
    <div className="products">
      <div className="browser">
        <input type="text" placeholder='Wyszukaj resaurację' />
        <div className="circle"><img src="/images/magnifying-glass-solid-full.svg" alt="glass" width={30} /></div>
      </div>
      <h2>Kategorie</h2>
      <div className="categories" id='categories'>
        <button className="category-active" onClick={ProductsList_Button}>WSZYSTKO</button>
        <button className="category" onClick={ProductsList_Button}>PIZZA</button>
        <button className="category" onClick={ProductsList_Button}>BURDERY</button>
        <button className="category" onClick={ProductsList_Button}>SAŁATKI</button>
        <button className="category" onClick={ProductsList_Button}>DANIA GŁÓWNE</button>
        <button className="category" onClick={ProductsList_Button}>DANIA DNIA</button>
        <button className="category" onClick={ProductsList_Button}>NAPOJE</button>
      </div>
      <div>
        <Show_Products onProductClick={(product) => setSelectedProduct(product)} />

        {selectedProduct && (
          <Product_Popup 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={onAdd}
          />
        )}
      </div>
    </div>
  )
}

function ProductsList_Button(event){
  const categories = Array.from(document.getElementById('categories').children)
  const btn = event.target

  categories.forEach(element => {
    if(element.className == 'category-active'){
      element.className = 'category'
    }
  })

  btn.className = 'category-active'
}

export default ProductsList