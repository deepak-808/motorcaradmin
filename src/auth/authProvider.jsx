// AuthContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken]= useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const getToken = localStorage.getItem("token") || '';
    
    if (storedUser && getToken) {
      setUser(JSON.parse(storedUser));
      setToken(getToken);
    }
  
    setLoading(false);
  }, []);
  

  const login = async (userData) => {
    // Simulate an async operation (e.g., API call, validation)
    try {
      console.log("userdata",userData)
      const {email, password} = userData
      const result = await axios.post(`${API_URL}auth/login`, {email, password});
      console.log("result",result.data.status)
      if(result.data.status === "OK" && result.data.statusCode === 200){
        setUser(result.data.data.user)
        localStorage.setItem('user', JSON.stringify(result.data.data.user))
        localStorage.setItem("token", result.data.data.token)
        setToken(result.data.data.token);
      }
      // else{
      //   const t = localStorage.setItem('token', result.data.token)
      //   const userdata = JSON.stringify(result.data.user)
      //   localStorage.setItem('user', userdata);
      //   setUser(userdata);
      //   setToken(t)
      //   setLoading(false);
      // }
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Your logout logic here
    // For example, await authService.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

