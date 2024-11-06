import { Recipe } from "../../types/types"

const PostItem = (currentPost: Recipe) => {
    return (
        <li className = "list-group-item d-flex flex-column justify-content-between mb-5 p-5 align-items-left border rounded">
            <div className="mb-2" style = {{fontSize: "20px", fontWeight:"bold"}}>{currentPost.name}</div>
            <div className="mb-2">{currentPost.rating}R - {currentPost.like} likes - {currentPost.time}</div>
            <div className="tags-container p-2 mt-2" >
                {currentPost.tags.map((tag) => (
                    <span key={tag} className="badge me-2" style = {{ backgroundColor: "lightblue", color: "black", fontSize: "15px"}}>{tag}</span>
                ))}
            </div>
        </li>
    )
}

export default PostItem;