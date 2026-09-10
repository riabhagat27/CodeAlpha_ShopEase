const API_BASE_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('shopease_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth API
  register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getMe: () => fetchAPI('/auth/me'),

  // Products API
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category) query.append('category', params.category);
    if (params.sort) query.append('sort', params.sort);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return fetchAPI(`/products${queryString}`);
  },
  getProductById: (id) => fetchAPI(`/products/${id}`),

  // Orders API
  createOrder: (orderData) => fetchAPI('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getOrders: () => fetchAPI('/orders'),
  getOrderById: (id) => fetchAPI(`/orders/${id}`),
};
