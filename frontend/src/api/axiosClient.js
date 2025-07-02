
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8000',
});

// Interceptor cho mọi request
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        const res = await api.post('/api/auth/refresh/', { refresh: refresh_token });
        const new_access_token = res.data.access;
        localStorage.setItem('access_token', new_access_token);
        // Gắn lại token mới vào header và gửi lại request cũ
        originalRequest.headers['Authorization'] = 'Bearer ' + new_access_token;
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn, chuyển về trang đăng nhập
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

