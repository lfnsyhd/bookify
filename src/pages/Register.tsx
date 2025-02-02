import { useEffect, useState } from 'react';
import { useUser } from '../context/user';
import { useNavigate } from 'react-router-dom';
import routes from "../router/routes";
import HeaderLogin from '../components/HeaderLogin';
import TextInput from '../components/TextInput';
import Alert from '../components/Alert';
import Button from '../components/Button';
import FooterLogin from '../components/FooterLogin';
import LoginLayout from '../layouts/LoginLayout';

const Register = () => {
  const { user, register } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate(routes.admin?.dashboard);
      } else {
        navigate(routes.user?.dashboard);
      }
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    try {
      await register(name, email, password);
    } catch (error: any) {
      setError(error?.response?.data?.message ? error?.response?.data?.message : 'Unknown error. Try again later');
    }
  }

  if (loading) return null;

  return (
    <LoginLayout>
      <HeaderLogin>
        Daftar ke Bookify
      </HeaderLogin>
      {error && (
        <Alert
          type='danger'
          iconSize={18}
          message={error}
        />
      )}
      <TextInput
        id='name'
        type="text"
        label="Name"
        isLabel={true}
        placeholder="Name"
        value={name}
        onUpdate={setName}
      />
      <TextInput
        id='email'
        type="email"
        label="Email"
        isLabel={true}
        placeholder="Email"
        value={email}
        onUpdate={setEmail}
      />
      <TextInput
        id='password'
        type="password"
        label="Password"
        isLabel={true}
        placeholder="Password"
        value={password}
        onUpdate={setPassword}
        isToggle={true}
      />
      <Button onClicked={handleRegister}>
        Daftar
      </Button>
      <FooterLogin
        text="Sudah punya akun?"
        textBold="Masuk ke Bookify"
        to={routes.login}
      />
    </LoginLayout>
  )
}

export default Register