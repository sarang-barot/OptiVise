import { useEffect, useState } from 'react';
import '../auth.form.scss'
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  useEffect(() => {
    document.title = 'Login | OptiVise';
  }, []);
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!trimmedPassword) {
      nextErrors.password = 'Password is required.';
    } else if (trimmedPassword.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await handleLogin({ email: email.trim(), password: password.trim() });
    navigate('/');
  }

  if(loading) {
    return (<main> <h1>Loading...</h1> </main>);
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              aria-invalid={Boolean(errors.email)}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              type="email" name="email" id="email" placeholder="Enter email address" value={email} required
            />
            {errors.email && <small style={{ color: '#ff6b6b', display: 'block', marginTop: '0.35rem' }}>{errors.email}</small>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              aria-invalid={Boolean(errors.password)}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              type="password" name="password" id="password" placeholder="Enter password" value={password} required minLength={6}
            />
            {errors.password && <small style={{ color: '#ff6b6b', display: 'block', marginTop: '0.35rem' }}>{errors.password}</small>}
          </div>
          <button className="button primary-button" type="submit">Login</button>
        </form>

        <p> Don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  );
}

export default Login