import axios from 'axios';

const API_URL = 'http://localhost:5000/'; // Remove 'api/auth/'

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + 'signup', { name, email, password });
    return response;
  } catch (error) {
    console.error('Signup error:', error.response || error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  // If you have any other user-related data in localStorage, clear it here
};