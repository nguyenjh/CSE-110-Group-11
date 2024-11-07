import { useState } from 'react'
import './App.css';
import pasta_img from './assets/pasta_img.png'

interface Comment {
  text: string;
  likes: number;
}

function App() {
  const [comments, setComments] = useState<Comment[]>([
    { text: 'This was so simple to make but so delicious!', likes: 2 },
    { text: 'So good! I recommend adding more veggies!', likes: 3 },
    { text: 'Can’t wait to see more recipes from you!', likes: 1 }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, likes: 0 }]);
      setNewComment('');
    }
  };

  return (
    <div className="app">
      <div className="recipe">
        <div className="titleAndDetails">
          <div className="titleAndImg">
            <div className="titleDetailContainer">
              <div className="titleSection">
                <h1>Easy Spaghetti <span role="img" aria-label="bookmark"></span></h1>
                <p className="rating">Rating: 4.2 / 5 | Likes: 1.6k</p>
              </div>
              <div className="details">
                <p>🕒 Prep: 20 min | 🕒 Estimated Total: 1.1 hr | Serves: 6 | Calories: 550</p>
                <p>Tags: <span className="tag fast">Fast</span> <span className="tag cheap">Cheap</span> <span className="tag italian">Italian</span></p>
                <p>Created by: [User]</p>
              </div>
              <div className="ingredients">
                <h3>Ingredients:</h3>
                <p>1 small onion (chopped), 1 bell pepper (chopped), 2 tbsp garlic powder, 3 tbsp butter, 1 tsp salt, 1 tsp pepper, 2 cans (15 oz) tomato sauce, 1 box (16 oz) spaghetti noodles, 1 - 1 1/2 lb hamburger meat</p>
              </div>
              
              <div className="directions">
                <h3>Directions:</h3>
                <ol>
                  <li>On medium heat, melt the butter and sautee the onion and bell peppers.</li>
                  <li>Add the hamburger meat and cook until meat is well done.</li>
                  <li>Add the tomato sauce, salt, pepper, and garlic powder.</li>
                  <li>Salt, pepper, and garlic powder can be adjusted to your own tastes.</li>
                  <li>Cook noodles as directed.</li>
                  <li>Mix the sauce and noodles if you like; I keep them separated.</li>
                </ol>
              </div>
              <div className="actions">
                <button>Share: 🔗</button>
                <button>Bookmark: 🔖</button>
                <button>Like: ❤️</button>
                <div className="rating">Rating: ⭐⭐⭐☆☆</div>
              </div>
            </div>
            <div className="imgAndCommentsContainer">
              <div className="imgHolder">
                <img className='pasta_img' src={pasta_img} alt="" />
              </div>
              <div className="comments">
                <h3>Comments:</h3>
                <div className="commentInputAndBtn">
                  <input
                    type="text"
                    placeholder="post a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={handleAddComment}>Post</button>
                </div>
                <div className="comment-section">
                  {comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <p>{comment.text}</p>
                      <p>❤️ {comment.likes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>

        

        
      </div>
    </div>
  );
}

export default App;
