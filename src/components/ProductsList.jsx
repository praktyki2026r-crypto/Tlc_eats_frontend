import Show_Products from "./ShowProducts"
import Product_Popup from "./ProductPopup"
import { useState, useEffect } from "react"
import { getActiveOrder } from "../api"

const CATEGORIES = ['WSZYSTKO', 'PIZZA', 'BURGERY', 'SAŁATKI', 'ZUPY', 'MAKARONY', 'NAPOJE']

function ProductsList({ onAdd }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('WSZYSTKO')
  const [allRestaurants, setAllRestaurants] = useState(false)

  useEffect(() => {
    getActiveOrder().then(data => {
      if (data && data.id) {
        setAllRestaurants(data.all_restaurants)
      }
    })
  }, [])

  return (
    <div className="products">
      <div className="browser">
        <input
          type="text"
          placeholder={allRestaurants ? 'Wyszukaj restaurację i dania' : 'Wyszukaj dania'}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="circle">
          <img src="/images/magnifying-glass-solid-full.svg" alt="glass" width={30} />
        </div>
      </div>

      <h2>Kategorie</h2>
      <div className="categories" id='categories'>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'category-active' : 'category'}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        <Show_Products
          onProductClick={product => setSelectedProduct(product)}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
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

export default ProductsList