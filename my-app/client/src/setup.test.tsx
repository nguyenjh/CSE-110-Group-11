import { render, screen, fireEvent } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from './views/LoginPage';
import Signup from './views/SignUp';

describe('LoginPage Component', () => {
  it('renders the login page and validates inputs', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Check if elements are rendered
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const robotCheckbox = screen.getByLabelText("I’m not a robot");
    const loginButton = screen.getAllByText('Login')[1]; // Use index to target the button

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(robotCheckbox).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    // Simulate user interactions
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(robotCheckbox);
    fireEvent.click(loginButton);

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(robotCheckbox).toBeChecked();
  });
});

describe('Signup Component', () => {
  it('renders the signup page and validates inputs', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Check if elements are rendered
    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const robotCheckbox = screen.getByLabelText("I’m not a robot");
    const signUpButton = screen.getAllByText('Sign Up')[1]; // Use index to target the button

    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(robotCheckbox).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    // Simulate user interactions
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(robotCheckbox);
    fireEvent.click(signUpButton);

    expect(emailInput).toHaveValue('test@example.com');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
    expect(robotCheckbox).toBeChecked();
  });
});

describe('Dummy test', () => {
  it('should always pass', () => {
    expect(true).toBe(true);
  });
});
