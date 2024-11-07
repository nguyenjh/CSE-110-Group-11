# Homepage Demo V.1 - Working Database, No CSS

---

## File Structure

### Server folder contains
* db folder - includes only connection.js that connects our recipe database to our server.
* routes folder - includes only recipe_route.js router requests for GET, PATCH, POST, and DELETE (this will be called in client files Recipe.tsx and RecipeList.tsx). We use the id in the current address to call specific recipes from the database. imported from db/connection.js.
* config.env - Has our MongoDB Atlas URI (specialized to my ip address currently), and the port number 5050.
* server.js - Combines these files together to run the server on port 5050.


### Client folder contains:
* app.tsx - we include mantine css module and run navbar and outlet (which is further defined in main.tsx
* */components*  -
  * Navbar.tsx - our navbar using react-router-dom instead of mantine for consistency with react.
  * Recipe.tsx - handles the form to create new recipe posts as well as updating a post.
  * RecipeList.tsx - handles displaying the recipes in a list on the homepage. Also handles the delete button and links to the edit button.
* main.tsx - Where ReactDOM root is created and rendered and a createBrowserRouter is made with routes defining the routes our websites goes (currently "/", "/edit/:id", and "/create"

NOTE: Other files are configuration that I am not too familiar with, mostly setup stuff.

---

## How To Run

### Pre-setup
MongoDB Atlas requires you to connect your IP address and possibly account to the database used.

### Instructions

1. Open a new terminal and cd to project/server.
2. Plug this into the terminal to start the server:
   > node --env-file=config.env server
   
  If this does not output "Connected to MongoDB" and "Server on ${PORT}", then you may not have properly updated config.env.
3. Open a seperate terminal and cs to project/client.
4. Plug this into the terminal to start the client:
   > npm run dev
   This will start a node.js runtime environment of the client.
