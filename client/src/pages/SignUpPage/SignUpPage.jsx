import AuthForm from '../../features/auth/ui/AuthForm/AuthForm';

export default function SignUpPage({ setUser }) {
  return <AuthForm type='signup' setUser={setUser} />;
}
