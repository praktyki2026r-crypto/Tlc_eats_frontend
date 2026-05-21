import Show_Products from "./ShowProducts"
import Product_Popup from "./ProductPopup"
import { useState } from "react"

const CATEGORIES = ['WSZYSTKO', 'PIZZA', 'BURGERY', 'SAŁATKI', 'ZUPY', 'MAKARONY', 'NAPOJE']

function ProductsList({ onAdd }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('WSZYSTKO')

  return (
    <div className="products">
      <div className="browser">
        <input
          type="text"
          placeholder='Wyszukaj restaurację lub danie'
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