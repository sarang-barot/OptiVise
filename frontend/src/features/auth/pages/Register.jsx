import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  useEffect(() => {
    document.title = 'Register | OptiVise';
  }, []);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { handleRegister, loading } = useAuth();

  const validateForm = () => {
    const nextErrors = {};
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) {
      nextErrors.username = 'Username is required.';
    } else if (trimmedUsername.length < 3) {
      nextErrors.username = 'Username must be at least 3 characters.';
    }

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

    await handleRegister({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    });
    navigate('/');
  };

  if(loading) {
    return (<main> <h1>Loading...</h1> </main>);
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              aria-invalid={Boolean(errors.username)}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
              }}
              type="text" name="username" id="username" placeholder="Enter username" value={username} required minLength={3}
            />
            {errors.username && <small style={{ color: '#ff6b6b', display: 'block', marginTop: '0.35rem' }}>{errors.username}</small>}
          </div>
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
          <button className="button primary-button" type="submit">Register</button>
        </form>

        <p> Already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  );
}

export default Register