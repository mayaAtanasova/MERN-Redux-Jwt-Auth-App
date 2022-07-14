import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import { Provider } from 'react-redux';
import store from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Profile from './Components/Profile/Profile';

const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '';

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      < Route path='/profile' element={<Profile />} />
    </Routes>
    </BrowserRouter>
    </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
