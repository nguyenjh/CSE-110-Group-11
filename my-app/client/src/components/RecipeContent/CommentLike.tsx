import { useState } from "react";

export default function CommentLike (comment: any, index: any) {
    const [isCommentLiked, setIsCommentLiked] = useState<boolean>(false);
    const [numberLikesPerComment, setnumberLikesPerComment] = useState<number>(0); // change initial by getting number of likes from db later
    const likeCommentToggle = () => {
        setIsCommentLiked((prevIsLiked) => {
          const newIsLiked = !prevIsLiked;
          setnumberLikesPerComment((prevLikes) => (newIsLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1)));
          return newIsLiked;
        });
      };
  
       return(
         <div key={index} className="comment">
            <button
             id="likeComment"
             onClick={likeCommentToggle}
             style={{ border:'none', background:'none', fontSize:'20px'}}
            >
               {isCommentLiked ? '💖' : '🩶'}
            </button>
            <span>{numberLikesPerComment}</span>
         </div>
       );
}
