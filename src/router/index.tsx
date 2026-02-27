import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import AuthRoute from '../components/AuthRoute';
import layoutRoutes from './layoutRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: layoutRoutes,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
