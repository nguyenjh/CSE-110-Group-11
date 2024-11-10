import '../css/Post.css';
import {NavLink} from "react-router-dom";

const NewPostButton = () => {
    return (
        <div className="addingButton">
            <NavLink className="add" to="/create">
            +
            </NavLink>  
        </div>
    );
};

export default NewPostButton;
