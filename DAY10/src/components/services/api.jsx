import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Adjust the base URL as needed

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Request config", config);
        return config;
    },
    (error) => {
        console.log("Request error", error);
        return Promise.reject(error);
    }
);

const registerTeamMember = (name, email, password, contact, role) => axiosInstance.post('/users/auth/register', { name, email, password, contact, role });
const registerProjectManager = (name, email, password, contact, role) => axiosInstance.post('/users/auth/register/pm', { name, email, password, contact, role });

export { axiosInstance, registerProjectManager, registerTeamMember }