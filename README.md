# Project V.4 - Database Merge / Interface Updates / Account Page Frontend 

---

## File Structure

### Server folder contains
* db folder - includes only connection.js that connects our recipe database to our server.
* routes folder - includes only recipe_route.js router requests for GET, PATCH, POST, and DELETE (this will be called in client files Recipe.tsx and RecipeList.tsx). We use the id in the current address to call specific recipes from the database. imported from db/connection.js.
* config.env - Has our MongoDB Atlas URI (specialized to my ip address currently), and the port number 5050.
* server.js - Combines these files together to run the server on port 5050.


### Client folder contains:
* App.tsx - we include mantine css module and run navbar and outlet (which is further defined in main.tsx
* */components*  -
  * Navbar.tsx - our navbar using react-router-dom instead of mantine for consistency with react.
  * Recipe.tsx - handles the form to create new recipe posts as well as updating a post.
  * RecipeList.tsx - handles displaying the recipes in a list on the homepage. Also handles the delete button and links to the edit button.
* main.tsx - Where ReactDOM root is created and rendered and a createBrowserRouter is made with routes defining the routes our websites goes (currently "/", "/edit/:id", and "/create"

NOTE: Other files are configuration that I am not too familiar with, mostly setup stuff.

---

## How To Run

### Pre-setup
* MongoDB Atlas requires you to connect your IP address and possibly account to the database used.
* You will also have to run
 > npm install
 >  
   in a terminal in /my-app folder when you first run the node.js instance.
* If there is an error with bootstrap, install it again using: 
 > npm i bootstrap@5.3.3
 >
  in the terminal in /my-app folder.

### Instructions

1. Open a new terminal and cd to my-app/server.
2. Make sure you have installed the following dependencies:
   > npm install mongodb express cors
   >
4. Plug this into the terminal to start the server:
   > node --env-file=config.env server
   > 
   If this does not output "Connected to MongoDB" and "Server on ${PORT}", then you may not have properly updated config.env.
5. Open a seperate terminal and cs to my-app/client.
6. Make sure you have installed the following dependencies:
   >react install
8. Plug this into the terminal to start the client:
   > npm run dev
   >
   This will start a node.js runtime environment of the client.

---

## Known Bugs
