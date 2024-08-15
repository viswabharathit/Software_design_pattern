import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "./api";

const setToken = (token) => localStorage.setItem('token', token);

const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('Retrieved Token:', token); // Log the token
        return token;
    }
    return null;
}

const getUserEmail = () => {
    const token = getToken();
    if (token) {
        try {
            const payLoad = jwtDecode(token);
            return payLoad?.sub;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    return null;
}

const getUserRole = () => {
    const token = getToken();
    if (token) {
        try {
            const payLoad = jwtDecode(token);
            return payLoad?.role;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    return null;
}

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        try {
            const payLoad = jwtDecode(token);
            return Date.now() < (payLoad.exp * 1000);
        } catch (error) {
            console.error('Error decoding token:', error);
            return false;
        }
    }
    return false;
}

const SignIn = (email, password) => axiosInstance.post("/users/auth/login", { email, password });
const SignOut = () => localStorage.clear();

export const authService = { getToken, setToken, getUserEmail, getUserRole, isLoggedIn, SignIn, SignOut };