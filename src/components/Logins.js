import React, {useEffect,  useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  useEffect(()=>{
    const cn=localStorage.getItem('user');

    if(cn){
      navigate('/home');
    }
    
},[])

  const handleLogin = () => {
    axios.post('http://localhost:8000/api/auth/login', { email, password })
      .then(response => {
        console.log('Logged in:', response.data);

        // Assuming the API response contains a token and user data
        const { token, user } = response.data;

        // Show alert
        alert('Login successful!');

        // Save token in cookie (expires in 1 day)
        document.cookie = `token=${token}; max-age=${60 * 60 * 24}; path=/`;

        // Save user data in local storage
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));

        // Navigate to the home page after successful login
        navigate('/home');
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Login failed, please check your credentials.');
      });
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className='login-main'>
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleLogin} className="login-button">Login</button>
          <div className="signup-option">
          <p>Don't have an account?</p><Link to="/Signup">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
