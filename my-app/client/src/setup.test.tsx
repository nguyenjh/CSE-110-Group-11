import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './views/NavBar';
import { suggestTag } from './constants/constants';
import { it, describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RecipeContent from './views/RecipeContent';
import { RecipeContextProvider } from './context/RecipeContext';
import PostCreation from './views/PostCreation';

describe('Test nav bar', () => {
  it('should render side navigation bar and dropdowns', async () => {
    render(
      <MemoryRouter>
        <NavBar />  
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
    expect(screen.getByText('Under $5')).toBeInTheDocument();
  
    fireEvent.click(calories);
    expect(screen.getByText('Over 150 Calo')).toBeInTheDocument();
  
    fireEvent.click(time);
    expect(screen.getByText('10-30mins')).toBeInTheDocument();
  
    fireEvent.click(sort);
    expect(screen.getByText('Something')).toBeInTheDocument();
  
    suggestTag.forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });
});

test('feeds interface',  () => {
  render(
    <MemoryRouter>
      <NavBar />  {/* Render App component since MyNewsFeed is now inside it */}
    </MemoryRouter>
  );

  // Look for the top bar on the screen
  const navbar = screen.getByTestId('topbar');
  expect(navbar).toBeInTheDocument();

  // Look for side menu (hamburger)
  const hamburgerMenu = screen.getByTestId('hamburger menu');
  expect(hamburgerMenu).toHaveClass('inactive'); 

  // Check if the sidebar is inactive
  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toHaveClass('inactive');

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
    expect(likeButton).toHaveTextContent('Like: 🩶');
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

