import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5002/api',
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const createTicket = (data, token) =>
    api.post('/tickets', data, {headers: { Authorization: `Bearer ${token}` }});
export const getTickets = (token) =>
    api.get('/tickets', { headers: {Authorization: `Bearer ${token}` }});
export const updateTicketStatus = (ticketId, data, token) =>
    api.put(`/tickets/${ticketId}`, data, { headers: { Authorization: `Bearer ${token}` } });

export default api;