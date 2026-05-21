import { Menu_Position } from "../assets/Menu_Position"

const menu_list = [new Menu_Position('Espresso', ['S', 'M', 'L'], 20, 1, ['Świerzo mielone ziarna kawy', 'Mleko'], ['Mleko krwie (domyślnie)', 'Mleko krowie bez laktozy', 'Mleko migdałowe', 'Mleko owsiane']), new Menu_Position('Cappucino', ['S', 'M', 'L'], 25, 2, ['Świerzo mielone ziarna kawy', 'Mleko'], ['Mleko krwie (domyślnie)', 'Mleko krowie bez laktozy', 'Mleko migdałowe', 'Mleko owsiane'])]

function Show_Products({onProductClick}){
  return(
    <>
      <div className="products-list">
        {menu_list.map((element) => (
          <div className='wrapper' key={element.id}>
            <div className="dawheel"></div>
            <div className="product" key={element.name}>
              <h2>{element.name}</h2>
              <div className="info">
                <div>
                  <p className='sizes'>Rozmiar: {element.sizes[0]}/{element.sizes[1]}/{element.sizes[2]}</p>
                  <p className='cost'>{element.cost} zł</p>
                </div>
                <img
                  src="/images/circle-plus-solid-full.svg"
                  alt="plus"
                  width={50}
                  className='showproduct'
                  onClick={() => onProductClick(element)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Show_Products