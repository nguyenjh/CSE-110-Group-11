Working database, bad css.

Server folder contains:
* a db folder with connection.js that connects our recipe database to our server.
* a routes folder with recipe_route.js router requests for GET, PATCH, POST, and DELETE (this will be called in client files Recipe.tsx and RecipeList.tsx). We use the id in the current address to call specific recipes from the database. imported from db/connection.js
*config.env has our MongoDB Atlas URI (specialized to my ip address currently), and the port number 5050.
* finally, server.js combines these files together to run the server on port 5050.

Client folder contains:
* app.tsx - we include mantine css module and run navbar and outlet (which is further defined in main.tsx)
** components -
* Navbar.tsx - our navbar using react-router-dom instead of mantine for consistency with react.
* Recipe.tsx - handles the form to create new recipe posts as well as updating a post.
* RecipeList.tsx - handles displaying the recipes in a list on the homepage. Also handles the delete button and links to the edit button.
* main.tsx - Where ReactDOM root is created and rendered and a createBrowserRouter is made with routes defining the routes our websites goes (currently "/", "/edit/:id", and "/create"

Other files are configuration that I am not too familiar with, mostly setup stuff.

Unfortunately, this version lacks any commenting. I will work on adding comments ASAP. 
Please give me time, as I want to put special amounts of care into the comments so everyone on the team can understand what is going on in both the backend and 
frontend (which I will begin experimenting with frontend as soon as I'm done adding comments).
