import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported correctly
import '../css/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRobotChecked, setIsRobotChecked] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    robot: '',
    form: ''
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const validateLoginForm = async () => {
    let formValid = true;
    const newErrors = { email: '', password: '', robot: '', form: '' };
  
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      newErrors.email = 'Please enter a valid email address.';
      formValid = false;
    }
  
    if (password.length === 0) {
      newErrors.password = 'Please enter your password.';
      formValid = false;
    }
  
    if (!isRobotChecked) {
      newErrors.robot = 'Please confirm you are not a robot.';
      formValid = false;
    }
  
    setErrors(newErrors);
  
    if (!formValid) {
      return;
    }
  
    try {
      setIsProcessing(true);
  
      const response = await fetch('http://localhost:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: errorData.message || 'Login failed',
        }));
        setIsProcessing(false);
        return;
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
  
      // Redirect to homepage
      window.location.href = '/'; // Adjust route as needed
    } catch (error) {
      console.error('Error during login:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Something went wrong. Please try again later.',
      }));
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="error" id="email-error">{errors.email}</span>}

      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span className="error" id="password-error">{errors.password}</span>}

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="not-robot"
          checked={isRobotChecked}
          onChange={() => setIsRobotChecked(!isRobotChecked)}
        />
        <label htmlFor="not-robot">I’m not a robot</label>
      </div>
      {errors.robot && <div className="error" id="robot-error">{errors.robot}</div>}

      <button type="button" onClick={validateLoginForm} disabled={isProcessing}>
        {isProcessing ? 'Authenticating...' : 'Login'}
      </button>

      {errors.form && <span className="error" id="form-error">{errors.form}</span>}

      <p>Not registered? <Link to="/signup">Create an account</Link></p>
    </div>
  );
};

export default LoginPage;
