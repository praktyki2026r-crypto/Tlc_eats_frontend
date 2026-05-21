import { useState, useEffect } from "react"
import { getRestaurants } from "../api"

function Show_Products({ onProductClick, searchQuery, activeCategory }) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRestaurants()
      .then(data => {
        if (Array.isArray(data)) {
          setRestaurants(data)
        } else {
          setError('Błąd pobierania danych')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // zbierz wszystkie dania ze wszystkich restauracji
  const allItems = restaurants.flatMap(restaurant =>
    restaurant.categories.flatMap(category =>
      category.menu_items.map(item => ({
        ...item,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id,
        categoryName: category.name,
        isOpen: restaurant.is_open,
      }))
    )
  )

  // filtruj po kategorii
  const categoryFiltered = activeCategory && activeCategory !== 'WSZYSTKO'
    ? allItems.filter(item =>
        item.categoryName.toUpperCase().includes(activeCategory) ||
        item.restaurantName.toUpperCase().includes(activeCategory)
      )
    : allItems

  // filtruj po wyszukiwarce
  const filtered = searchQuery
    ? categoryFiltered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryFiltered

  if (loading) return <p style={{ padding: '1rem' }}>Ładowanie menu...</p>
  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>

  return (
    <div className="products-list">
      {filtered.map(item => (
        <div className='wrapper' key={`${item.restaurantId}-${item.id}`}>
          <div className="dawheel"></div>
          <div className="product">
            <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.restaurantName}</p>
            <h2>{item.name}</h2>
            <div className="info">
              <div>
                {item.option_groups?.length > 0 && (
                  <p className='sizes'>
                    {item.option_groups[0].options.map(o => o.name).join(' / ')}
                  </p>
                )}
                <p className='cost'>{item.price} zł</p>
                {!item.isOpen && (
                  <p style={{ color: 'red', fontSize: '0.75rem' }}>Zamknięta</p>
                )}
              </div>
              <img
                src="/images/circle-plus-solid-full.svg"
                alt="plus"
                width={50}
                className='showproduct'
                onClick={() => onProductClick({
                  ...item,
                  sizes: item.option_groups?.[0]?.options?.map(o => o.name) || [],
                  ingredients: item.ingredients ? item.ingredients.split(',').map(s => s.trim()) : [],
                  addons: [],
                  cost: parseFloat(item.price),
                })}
              />
            </div>
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <p style={{ padding: '1rem' }}>Brak produktów</p>
      )}
    </div>
  )
}

export default Show_Products