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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/following" element={<Following />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Search />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
