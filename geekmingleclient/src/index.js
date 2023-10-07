import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './Contexts/UserContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);