import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <div>Login Page</div>,
  },
  {
    path: '/register',
    element: <div>Register Page</div>,
  },
  {
    path: '/',
    element: <ProtectedRoute><div>Dashboard</div></ProtectedRoute>,
  },
  {
    path: '/consultation',
    element: <ProtectedRoute><div>Consultation</div></ProtectedRoute>,
  },
  {
    path: '/history',
    element: <ProtectedRoute><div>History</div></ProtectedRoute>,
  },
  {
    path: '/admin',
    element: <ProtectedRoute adminOnly><div>Admin Panel</div></ProtectedRoute>,
  },
])

export default router
