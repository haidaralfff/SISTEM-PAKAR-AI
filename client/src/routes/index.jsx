import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ConsultationPage from '../pages/ConsultationPage'
import HistoryPage from '../pages/HistoryPage'
import HistoryDetailPage from '../pages/HistoryDetailPage'
import ProfilePage from '../pages/ProfilePage'
import AdminPage from '../pages/AdminPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'consultation', element: <ConsultationPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'history/:id', element: <HistoryDetailPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute adminOnly>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'admin', element: <AdminPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default router
