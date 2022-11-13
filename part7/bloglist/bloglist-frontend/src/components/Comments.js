import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addComment } from "../reducers/blogReducer";

const Comments = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector(state => state.blog.find(b => b.id === id));

  const submitComment = (event) => {
    event.preventDefault()
    
    const comment = event.target.comment.value
    const comments = blog.comments.concat(comment)
    event.target.comment.value = ""
    dispatch(addComment(comments, blog.id))
  }

  const commentElements = blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
  
  return (
    <>
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input name="comment" />
        <button>add comment</button>
      </form>
      <ul>
        {commentElements}
      </ul>
    </>
  )
}

export default Comments