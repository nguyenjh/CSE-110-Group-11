import { useContext } from "react";
import { Recipe } from "../../types/types";
import PostItem from "../post/PostItem";
import { AppContext } from "../../context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const PostList = () => {
    const { recipes } = useContext(AppContext);

    return (
        <div className="row mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
            {recipes.map((recipe: Recipe) => (
                <div className="col-sm-4" key={recipe.id}> {/* 4 columns for each post (3 posts per row) */}
                    <PostItem
                        id={recipe.id}
                        name={recipe.name}
                        summary={recipe.summary}
                        instruction={recipe.instruction}
                        time={recipe.time}
                        like={recipe.like}
                        rating={recipe.rating}
                        tags={recipe.tags}
                    />
                </div>
            ))}
        </div>
    );
};

export default PostList;
