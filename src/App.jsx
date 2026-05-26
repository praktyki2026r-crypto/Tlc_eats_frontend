import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { getMe, logout, getActiveOrder } from './api'
import LoginAndRegister from './components/LoginAndRegister'
import HomePage from './components/HomePage'
import Order from './components/Order'
import AccountSettings from './components/AccountSettings'
import OrdersHistory from './components/OrdersHistory'
import AdminMain from './components/admin-views/AdminMain'
import CreatingOrders from './components/admin-views/CreatingOrders'
import ManageOrders from './components/admin-views/ManageOrders'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeOrder, setActiveOrder] = useState(null)
  const isAdmin = currentUser?.is_initiator === true

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (token) {
      getMe().then(data => {
        if (data && data.id) {
          setCurrentUser(data)
          setIsSignedIn(true)
          // sprawdź aktywne zamówienie
          getActiveOrder().then(order => {
            if (order && order.id) setActiveOrder(order)
            else setActiveOrder(null)
          })
        }
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  function HandleLogin(user) {
    setCurrentUser(user)
    setIsSignedIn(true)
    // sprawdź aktywne zamówienie po zalogowaniu
    getActiveOrder().then(order => {
      if (order && order.id) setActiveOrder(order)
      else setActiveOrder(null)
    })
  }

  async function HandleLogOut() {
    await logout()
    setCurrentUser(null)
    setIsSignedIn(false)
    setActiveOrder(null)
  }

  function AdminHome() {
    if (activeOrder && activeOrder.id) {
      return <Navigate to='/manage-orders' />
    }
    return <Navigate to='/create-order' />
  }

  if (loading) return <div>Ładowanie...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={isSignedIn
            ? (isAdmin ? <AdminHome /> : <HomePage />)
            : <LoginAndRegister onLogin={HandleLogin} />}
        />
        <Route path='/manage-orders' element={isAdmin ? <ManageOrders /> : <Navigate to='/' />} />
        <Route path='/order' element={isSignedIn ? <Order currentUser={currentUser} /> : <Navigate to='/' />} />
        <Route path='/account' element={isSignedIn ? <AccountSettings currentUser={currentUser} onLogOut={HandleLogOut} /> : <Navigate to='/' />} />
        <Route path='/history' element={isSignedIn ? <OrdersHistory /> : <Navigate to='/' />} />
        <Route path='/create-order' element={isAdmin ? <CreatingOrders /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App