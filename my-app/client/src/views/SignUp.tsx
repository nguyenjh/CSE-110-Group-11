import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css';
import foodBG from '../assets/foodBG.jpg'; // Import image

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isRobotChecked: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    robot: '',
    form: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let validationErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      robot: '',
      form: '',
    };

    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      validationErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (formData.username.length <= 4) {
      validationErrors.username = 'Username must be more than 4 characters.';
      isValid = false;
    }

    if (formData.password.length <= 5 || !/\d/.test(formData.password)) {
      validationErrors.password = 'Password must be at least 6 characters and contain a number.';
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!formData.isRobotChecked) {
      validationErrors.robot = 'Please confirm you are not a robot.';
      isValid = false;
    }

    if (!isValid) {
      validationErrors.form = '*Please check the fields above';
    }

    setErrors(validationErrors);
    return isValid;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
  
    // Don't proceed if there are validation errors
    if (!isValid) return;

    // Reset modal in case of any previous errors
    setIsModalOpen(false);

    try {
      const response = await fetch('http://localhost:5050/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Handle case where the response is not JSON
        }
  
        // Set the error message in the state (for display)
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: errorMessage,
        }));
  
        // Don't show the modal if there's an error from backend
        return;
      }
  
      const data = await response.json();
      console.log('User registered:', data);
  
      // Open the modal only if registration is successful
      openModal();
    } catch (error) {
      console.error('Error during registration:', error);
  
      // Handle network or server errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Something went wrong. Please try again later.',
      }));
  
      // Don't show the modal if there's a network/server error
    }
  };

  return (
    // wrap all content in div signup-page
    <div className="signup-page">
      <div className="title">PLATEFUL</div>
    <div className="background" style={{backgroundImage: `url(${foodBG})`}}></div>
      <div className="signup-container">

        <Link to="/login" className="back-button">
          &#8592; Back
        </Link>
        <h1>Sign Up</h1>

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="isRobotChecked"
            checked={formData.isRobotChecked}
            onChange={handleInputChange}
          />
          <label htmlFor="isRobotChecked">I’m not a robot</label>
        </div>
        {errors.robot && <span className="error">{errors.robot}</span>}

        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>

        {errors.form && <span className="error">{errors.form}</span>}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Account successfully created!</h2>
              <button onClick={() => (window.location.href = '/login')}>
                Return to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
