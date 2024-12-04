import AuthForm from '../../features/auth/ui/AuthForm/AuthForm';

export default function SignInPage({ setUser }) {
  return <AuthForm type='signin' setUser={setUser} />;
}
