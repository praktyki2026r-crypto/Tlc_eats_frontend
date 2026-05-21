import Banner from "./Banner"

function OrdersHistory(){
  const orders = [
    {order_number: 69, date: '11.09.2001', hour: '21:37', status: 'fucked', cost: 67},
    {order_number: 66, date: '09.11.1002', hour: '21:37', status: 'unfucked', cost: 140}
  ]

  return(
    <>
      <Banner />
      <div className="history-container">
        <div>
          <h1>Historia zamówień</h1>
          <table>
            <thead>
              <tr>
                <th>Numer zamówienia</th>
                <th>Data</th>
                <th>Godina</th>
                <th>Status</th>
                <th>Cena</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((element) => (
                  <tr>
                    <td>{element.order_number}</td>
                    <td>{element.date}</td>
                    <td>{element.hour}</td>
                    <td>{element.status}</td>
                    <td>{element.cost}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <img src="/images/orders-histiory-graphic.svg" alt="pgraphic" height={600} />
      </div>
    </>
  )
}

export default OrdersHistory