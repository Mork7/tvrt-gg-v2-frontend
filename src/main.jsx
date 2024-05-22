import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route } from 'react-router';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext.jsx';

// Pages
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import Search from './pages/User/Search.jsx';
import Following from './pages/User/Following.jsx';
import Profile from './pages/User/Profile.jsx';
import Streams from './pages/User/Streams.jsx';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Search />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="following" element={<Following />} />
      <Route path="profile" element={<Profile />} />
      <Route path="streams" element={<Streams />} />
      <Route path="admin">
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
