import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './Apps';
import { MyNewsFeed } from './view/MyNewsFeed';
import NavBar from './components/navbar/NavBar';
import { suggestTag } from './constants/constants'; 
import { recipesList } from './constants/constants';
import { Recipe } from './types/types';
import exp from 'constants';

test('feeds interface', () =>{
  render (<MyNewsFeed />);
  //Look for top bar is on the scree
  const navbar = screen.getByTestId('topbar');
  expect(navbar).toBeInTheDocument();
  //Look for side bar is not on the screen
  const hamburger_menu = screen.getByTestId("hamburger menu");
  expect(hamburger_menu).toHaveClass('inactive');
  const sidebar = screen.getByTestId("sidebar");
  expect(sidebar).toHaveClass('inactive');
  //Look for the posts are on screen
  const posts = screen.getByTestId('posts-container');
  expect(posts).toBeInTheDocument();
  //Look for New post button on screen
  const add = screen.getByTestId("newPostButton");
  expect(add).toBeInTheDocument();
  

})

test('hamburger menu' , () => {
  render (<MyNewsFeed />);
  //get the hamburger menu
  const hamburger_menu = screen.getByTestId("hamburger menu");
  //Click hamburger menu
  fireEvent.click(hamburger_menu);
  /*Look for side bar is on the screen*/
  expect(hamburger_menu).toHaveClass('active');
  const sidebar = screen.getByTestId("sidebar");
  expect(sidebar).toHaveClass('active');

  //Check that the hamburger menu is worked.
  fireEvent.click(hamburger_menu);
  expect(hamburger_menu).toHaveClass('inactive');
  expect(sidebar).toHaveClass('inactive');

})

test('post content display', () => {
  render(<MyNewsFeed />);

  //Make sure posts are on screen   
  const posts_container = screen.getByTestId('posts-container');
  expect(posts_container).toBeInTheDocument();
  
  //verify that the correct number of Posts are rendered
  const posts = posts_container.querySelectorAll('.col-sm-4');
  expect(posts).toHaveLength(recipesList.length);

  //Check each post content
  recipesList.forEach((recipe) => {
    const post = posts_container.querySelector(`.col-sm-4:nth-child(${recipe.id})`);    
    expect(post).toBeInTheDocument();
    expect(post).toHaveTextContent(recipe.name);
    expect(post).toHaveTextContent(`${recipe.rating}R - ${recipe.like} likes - ${recipe.time}`);
    let tags = recipe.tags;
    tags.forEach((tag) => {
      expect(post).toHaveTextContent(tag);
    })
  });
})

test('top navigation bar', () => {
  render(<MyNewsFeed />);
  //Look for account, favorite, setting, sign out and the hamburger menu is on the top navigation bar
  const account = screen.getByText('Account');
  const favorite = screen.getByText('Favorite');
  const setting = screen.getByText('Setting');
  const signout = screen.getByText('Sign Out');
  const hamburger_menu = screen.getByTestId('hamburger menu');
  
  expect(account).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
  expect(setting).toBeInTheDocument();
  expect(signout).toBeInTheDocument();
  expect(hamburger_menu).toBeInTheDocument();
})

test('side navigation bar interface', () => {
  render(<NavBar />);
  //Look for dropdown buttons
  const cost = screen.getByText('Cost');
  const calories = screen.getByText('Calories');
  const time = screen.getByText('Time');
  const sort = screen.getByText('Sort By');
  expect(cost).toBeInTheDocument();
  expect(calories).toBeInTheDocument();
  expect(time).toBeInTheDocument();
  expect(sort).toBeInTheDocument();
  
  //Click on each dropdown buttons and see if some options are on screen
  fireEvent.click(cost);
  let randomCostOption = screen.getByText('Under $5');
  expect(randomCostOption).toBeInTheDocument();

  fireEvent.click(calories);
  let randomCaloriesOption = screen.getByText('Over 150 Calo');
  expect(randomCaloriesOption).toBeInTheDocument();

  fireEvent.click(time);
  let randomTimeOption = screen.getByText('10-30mins');
  expect(randomTimeOption).toBeInTheDocument();

  fireEvent.click(sort);
  let randomSortOption = screen.getByText('Something');
  expect(randomSortOption).toBeInTheDocument();

  //Look for tags button
  suggestTag.forEach(tag => {
    const tagElement = screen.getByText(tag); // Assumes each tag is displayed as text in your component
    expect(tagElement).toBeInTheDocument();
  });

})
