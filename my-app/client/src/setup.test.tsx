import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './views/NavBar';
import { suggestTag } from './constants/constants';
import { it, describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RecipeContent from './views/RecipeContent';
import { RecipeContextProvider } from './context/RecipeContext';
import PostCreation from './views/PostCreation';
import FilterBar from './views/FilterBar';
import { FilterContextProvider } from './context/FilterContext';

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
    expect(screen.getByText('$15-$30')).toBeInTheDocument();
    expect(screen.getByText('> $30')).toBeInTheDocument();
  
    fireEvent.click(calories);
    expect(screen.getByText('< 50 Calo')).toBeInTheDocument();
    expect(screen.getByText('50-150 Calo')).toBeInTheDocument();
    expect(screen.getByText('> 150 Calo')).toBeInTheDocument();
  
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

  test('like buttons', () => {
    render(
      <MemoryRouter>
        <RecipeContent />  
      </MemoryRouter>
    );
    //test for like button
    const likeButton = screen.getByTestId('like-post');
    expect(likeButton).toHaveTextContent('Like: 🤍');
    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent('Like: 💖');
  })
  });

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
    expect(screen.getByText("Summary:")).toBeVisible();
    expect(screen.getByText("Cost ($):")).toBeVisible();
    expect(screen.getByText("Tags:")).toBeVisible();
    expect(screen.getByText("Calories (kcal):")).toBeVisible();
    expect(screen.getByText("Prep Time:")).toBeVisible();
    expect(screen.getByTestId("prep-unit-input")).toBeVisible();
    expect(screen.getByText("Servings (#):")).toBeVisible();
    expect(screen.getByText("Total Time:")).toBeVisible();
    expect(screen.getByTestId("total-unit-input")).toBeVisible();
    expect(screen.getByText("Ingredients")).toBeVisible();
    expect(screen.getByText("Add Ingredient")).toBeVisible();
    expect(screen.getByText("Upload Additional Photos")).toBeInTheDocument();
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

