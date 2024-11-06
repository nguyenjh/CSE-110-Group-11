import NavBar from "../components/navbar/NavBar";
import PostList from "../components/post/PostList";
import "../view/NewsFeed.css"
export const MyNewsFeed = () => {
    return (
        <div className="body">
            <div className="viewNavBar" >
                    <NavBar />
            </div>

            <div className="posts">
                <PostList />
            </div>
               
        </div>
    );
};
