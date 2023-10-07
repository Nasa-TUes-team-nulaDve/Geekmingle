import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './Contexts/UserContext';

import Layout from './Components/MainPageLayout';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';

import Login from './pages/Login';
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="project/10" element={<ProjectPage />} />
          {/* <Route path="/" element={<AllProjects />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>
);