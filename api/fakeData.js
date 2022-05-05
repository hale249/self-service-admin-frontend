import http from '../utils/http.js';
export function fetchData(params) {
  return http.get('/user', { params: params });
}
