import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './views/NavBar';
import { suggestTag } from './constants/constants';
import { it, describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RecipeContent from './views/RecipeContent';
import { RecipeContextProvider } from './context/RecipeContext';
import PostCreation from './views/PostCreation';
import { RecipeFormErrorContextProvider } from './context/RecipeFormErrorsContext';
import FilterBar from './views/FilterBar';
import { FilterContextProvider } from './context/FilterContext';
import LoginPage from './views/LoginPage';
import Signup from './views/SignUp';


describe('Test filter bar', () => {
  it('should render the hamberger button and dropdowns', async () => {
    render(
      <MemoryRouter>
        <FilterContextProvider>
          <FilterBar />
        </FilterContextProvider>  
      </MemoryRouter>
    );

    // Test if dropdown elements are rendered after clicking
    const cost = screen.getByText('Cost');
    const calories = screen.getByText('Calories');
    const time = screen.getByText('Time');
    const sort = screen.getByText('Sort By');
  
    expect(cost).toBeInTheDocument();
    expect(calories).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
  
    fireEvent.click(cost);
    expect(screen.getByText('< $5')).toBeInTheDocument();
    expect(screen.getByText('$5-$15')).toBeInTheDocument();
    expect(screen.getByText('$16-$30')).toBeInTheDocument();
    expect(screen.getByText('> $30')).toBeInTheDocument();
  
    fireEvent.click(calories);
    expect(screen.getByText('< 500 Cal')).toBeInTheDocument();
    expect(screen.getByText('500-750 Cal')).toBeInTheDocument();
    expect(screen.getByText('751-1000 Cal')).toBeInTheDocument();
    expect(screen.getByText('> 1000 Cal')).toBeInTheDocument();
  
    fireEvent.click(time);
    expect(screen.getByText('< 10 mins')).toBeInTheDocument();
    expect(screen.getByText('10-30 mins')).toBeInTheDocument();
    expect(screen.getByText('> 30 mins')).toBeInTheDocument();
  
    fireEvent.click(sort);
    expect(screen.getByText('Newest')).toBeInTheDocument();
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  
    suggestTag.forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });
});



describe('Test buttons in Recipe Page', () => {
  it('should render the recipe page', async () => {
    render(
      <MemoryRouter>
        <RecipeContent />  
      </MemoryRouter>
    );

    //test for favorite button (bookmark)
    const bookmarkButton = screen.getByTestId('bookmark-up');
    expect(bookmarkButton).toHaveAttribute('src', expect.stringContaining('whiteRibbon.svg'));
    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toHaveAttribute('src', expect.stringContaining('blackRibbon.svg'));
  });

  test('renders search input and updates with user input', () => {
    render(
      <FilterContextProvider>
        <FilterBar />
      </FilterContextProvider>
    );
  
  // Update the placeholder to match the actual text
    const searchInput = screen.getByPlaceholderText(/Enter a recipe name/i) as HTMLInputElement;
  
    // Check that the search input is in the document
    expect(searchInput).toBeInTheDocument();
  
    // Simulate user typing in the search bar
    fireEvent.change(searchInput, { target: { value: 'Pasta' } });
  
    // Assert that the value of the input field has been updated
    expect(searchInput.value).toBe('Pasta');
  });

describe('PostCreation Component', () => {
  it('renders the post creation form', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <RecipeContextProvider>
          <RecipeFormErrorContextProvider>
            <PostCreation />
          </RecipeFormErrorContextProvider>
        </ RecipeContextProvider>
      </ MemoryRouter>
    );

    // Adjust the text based on actual content in the PostCreation component
    expect(screen.getByText("Title:")).toBeVisible();
    expect(screen.getByText("Summary:")).toBeVisible();
    expect(screen.getByText("Cost ($):")).toBeVisible();
    expect(screen.getByText("Tags:")).toBeVisible();
    expect(screen.getByText("Calories (kcal):")).toBeVisible();
    expect(screen.getByText("Prep Time (minutes):")).toBeVisible();
    expect(screen.getByText("Servings (#):")).toBeVisible();
    expect(screen.getByText("Total Time (minutes):")).toBeVisible();
    expect(screen.getByText("Ingredients")).toBeVisible();
    expect(screen.getByText("Add Ingredient")).toBeVisible();
    expect(screen.getByText("Upload Additional Photos")).toBeInTheDocument();
    expect(screen.getByText("Directions")).toBeVisible();
    expect(screen.getByText("Add Step")).toBeVisible();
    expect(screen.getByText("Submit")).toBeVisible();
  });
});

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