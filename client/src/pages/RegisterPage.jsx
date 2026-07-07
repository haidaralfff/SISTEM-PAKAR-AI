import AuthLayout from '../layouts/AuthLayout'
import RegisterForm from '../features/auth/components/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthLayout title="Daftar Akun">
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
