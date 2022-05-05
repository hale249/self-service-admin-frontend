import http from '../utils/http.js';
export function getUsers(data) {
    return http.get('/user', data);
}
