const BASE_URL = 'http://127.0.0.1:8000/api'

function getToken() {
  return localStorage.getItem('access')
}

async function request(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(`${BASE_URL}${endpoint}`, options)

  // token wygasł – odśwież
  if (response.status === 401) {
    const refreshed = await refreshToken()
    if (refreshed) {
      headers['Authorization'] = `Bearer ${getToken()}`
      const retry = await fetch(`${BASE_URL}${endpoint}`, { method, headers, body: body ? JSON.stringify(body) : null })
      return retry.json()
    } else {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      window.location.href = '/'
      return null
    }
  }

  return response.json()
}

async function refreshToken() {
  const refresh = localStorage.getItem('refresh')
  if (!refresh) return false
  const res = await fetch(`${BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  })
  if (res.ok) {
    const data = await res.json()
    localStorage.setItem('access', data.access)
    return true
  }
  return false
}

// AUTH
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (res.ok) {
    localStorage.setItem('access', data.tokens.access)
    localStorage.setItem('refresh', data.tokens.refresh)
  }
  return { ok: res.ok, data }
}

export async function register(firstName, lastName, email, password, password2) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password, password2 })
  })
  const data = await res.json()
  if (res.ok) {
    localStorage.setItem('access', data.tokens.access)
    localStorage.setItem('refresh', data.tokens.refresh)
  }
  return { ok: res.ok, data }
}

export async function logout() {
  const refresh = localStorage.getItem('refresh')
  await request('/logout/', 'POST', { refresh })
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}

export async function getMe() {
  return request('/me/')
}

// PROFIL
export async function getProfile() {
  return request('/profile/')
}

export async function updateProfile(data) {
  return request('/profile/', 'PATCH', data)
}

export async function changePassword(oldPassword, newPassword) {
  return request('/profile/change-password/', 'POST', {
    old_password: oldPassword,
    new_password: newPassword
  })
}

// RESTAURACJE I MENU
export async function getRestaurants() {
  return request('/restaurants/')
}

export async function getRestaurant(id) {
  return request(`/restaurants/${id}/`)
}

export async function getDailySpecial(restaurantId) {
  return request(`/restaurants/${restaurantId}/daily-special/`)
}

// ZAMÓWIENIA
export async function getActiveOrder() {
  return request('/orders/active/')
}

export async function createOrder(restaurantId, startTime, deadline, allRestaurants = false) {
  return request('/orders/', 'POST', {
    restaurant: allRestaurants ? null : restaurantId,
    all_restaurants: allRestaurants,
    start_time: startTime,
    deadline: deadline,
    price: 0
  })
}

export async function closeOrder(orderId) {
  return request(`/orders/${orderId}/close/`, 'POST')
}

export async function getOrderSummary(orderId, by = 'restaurant') {
  return request(`/orders/${orderId}/summary/?by=${by}`)
}

// ZAMÓWIENIA UŻYTKOWNIKA
export async function getUserOrders() {
  return request('/user-orders/')
}

export async function submitUserOrder(orderId, items) {
  return request('/user-orders/', 'POST', {
    order_id: orderId,
    items: items
  })
}

export async function getUserOrderHistory() {
  return request('/user-orders/history/')
}

export async function deleteOrderItem(userOrderId, itemId) {
  return request(`/user-orders/${userOrderId}/items/${itemId}/delete/`, 'DELETE')
}