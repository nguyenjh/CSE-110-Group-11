import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, describe, expect } from 'vitest';
import App from './App'

// Any other global configuration you want for tests
import { MemoryRouter } from 'react-router-dom';
import { RecipeContextProvider } from './context/RecipeContext';
import PostCreation from './views/PostCreation';

describe('PostCreation Component', () => {
  it('renders the post creation form', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <RecipeContextProvider>
          <PostCreation />
        </ RecipeContextProvider>
      </ MemoryRouter>
    );

    // Adjust the text based on actual content in the PostCreation component
    expect(screen.getByText("Title:")).toBeVisible();
    expect(screen.getByText("Tags:")).toBeVisible();
    expect(screen.getByText("Calories:")).toBeVisible();
    expect(screen.getByText("Prep Time:")).toBeVisible();
    expect(screen.getByText("Servings:")).toBeVisible();
    expect(screen.getByText("Total Time:")).toBeVisible();
    expect(screen.getByText("Ingredients")).toBeVisible();
    expect(screen.getByText("Add Ingredient")).toBeVisible();
    expect(screen.getByText("Upload Additional Photos")).toBeVisible();
    expect(screen.getByText("Directions")).toBeVisible();
    expect(screen.getByText("Add Step")).toBeVisible();
    expect(screen.getByText("Submit")).toBeVisible();
  });
});

describe('Dummy test', () => {
  it('should always pass', () => {
    expect(true).toBe(true);
  });
});

