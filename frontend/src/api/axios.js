import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

let accessToken = null;
export function setAccessToken(token){ accessToken = token; }

api.interceptors.request.use(config => {
  if(accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// response interceptor to auto-refresh
api.interceptors.response.use(res => res, async err => {
  const original = err.config;
  if(err.response && err.response.status === 401 && !original._retry){
    original._retry = true;
    try {
      const r = await api.post('/auth/refresh');
      setAccessToken(r.data.accessToken);
      original.headers.Authorization = `Bearer ${r.data.accessToken}`;
      return api(original);
    } catch(e){
      // redirect to login
      window.location.href = '/login';
      return Promise.reject(e);
    }
  }
  return Promise.reject(err);
});

export default api;
