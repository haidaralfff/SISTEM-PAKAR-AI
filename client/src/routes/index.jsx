import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../homepage/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ConsultationPage from '../pages/ConsultationPage'
import HistoryPage from '../pages/HistoryPage'
import HistoryDetailPage from '../pages/HistoryDetailPage'
import ProfilePage from '../pages/ProfilePage'
import ArticlesPage from '../pages/ArticlesPage'
import AdminPage from '../pages/AdminPage'
import SimulationPage from '../features/admin/components/SimulationPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
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
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'consultation', element: <ConsultationPage /> },
      { path: 'simulation', element: <SimulationPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'history/:id', element: <HistoryDetailPage /> },
      { path: 'articles', element: <ArticlesPage /> },
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
