import React, { useState, useEffect } from 'react';
import './Register.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from React Router if you're using it for navigation

const Register = () => {

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token !== null) {
      // Redirect to the login page if no token is found
      window.location.href = '/';
    }
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one letter and one number.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    // Validate the password using the regex pattern
    validatePassword(formData.password);

    if (passwordError) {
      return;
    }

    // Create a payload with the user data to send to the server for registration
    const registrationPayload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Replace 'REACT_APP_SERVER_URL' with the actual API endpoint from your .env file
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + '/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationPayload),
        }
      );

      if (response.ok) {
        // Registration successful, now perform the login
        const data = await response.json();
        const jwtToken = data.token;

        // Store tokens securely (e.g., in localStorage)
        localStorage.setItem('jwtToken', jwtToken);
        window.location.href = '/';
      } else {
        // Handle registration failure
        console.error('Registration Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='register-root'>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
                validatePassword(e.target.value);
              }}
              required
            />
            <div className='show-password'>
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </div>
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleConfirmPasswordBlur}
              required
            />
          </div>
          {confirmPasswordError && (
            <p className="error">{confirmPasswordError}</p>
          )}
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
        <Link to="/login">Already have an account? Log in</Link>
      </div>
    </div>
  );
};

export default Register;
