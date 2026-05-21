import { useState, useEffect } from 'react'
import { BrowserRouter, redirect, Route, Routes, Navigate } from 'react-router-dom'
import { User } from './assets/User'
import { path, use } from 'framer-motion/m'
import './App.css'
import LoginAndRegister from './components/LoginAndRegister'
import HomePage from './components/HomePage'
import Order from './components/Order'
import AccountSettings from './components/AccountSettings'
import OrdersHistory from './components/OrdersHistory'
import AdminMain from './components/admin-views/AdminMain'
import CreatingOrders from './components/admin-views/CreatingOrders'

let users = [
  new User(0, 'admin', 'admin', 'admin', 'admin'),
  new User(1, 'test', 'test', 'test')
]

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    const saved = localStorage.getItem('currentUser')
    if (saved)
    {
      setCurrentUser(JSON.parse(saved))
      setIsSignedIn(true)
    }
  }, [])

  function HandleLogin(user){
    setIsSignedIn(true)
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  function HandleLogOut()
  {
    setCurrentUser(null)
    setIsSignedIn(false)
    localStorage.removeItem('currentUser')
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={isSignedIn ? (isAdmin ? <AdminMain /> : <HomePage /> ) : <LoginAndRegister accounts={users} onLogin={HandleLogin} />}
        />
        <Route path='/order' element={isSignedIn ? <Order /> : <Navigate to='/' />} />
        <Route path='/account' element={isSignedIn ? <AccountSettings onLogOut={HandleLogOut} /> : <Navigate to='/' />} />
        <Route path='/history' element={isSignedIn ? <OrdersHistory /> : <Navigate to='/' />} />
        <Route path='/create-order' element={isAdmin ? <CreatingOrders /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
