import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      localStorage.setItem('userName', form.name);
      navigate('/dashboard');
    } else {
      // Handle login logic here
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-side">
        <div className={`form-container ${isSignUp ? 'sign-up' : 'login'}`}>
          <div className="form-header">
            <button className={`form-switch ${!isSignUp ? 'active' : ''}`} onClick={toggleForm}>Login</button>
            <button className={`form-switch ${isSignUp ? 'active' : ''}`} onClick={toggleForm}>Sign Up</button>
          </div>
          <div className="form-content">
            <form onSubmit={handleSubmit} className={isSignUp ? "sign-up-form" : "login-form"}>
              <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
              {isSignUp && <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required />}
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleInputChange} required />
              <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
