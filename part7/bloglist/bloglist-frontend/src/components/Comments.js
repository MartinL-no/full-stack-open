import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addComment } from "../reducers/blogReducer";
import { Button, TextField } from "@mui/material";

const Comments = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector(state => state.blog.find(b => b.id === id));

  const submitComment = (event) => {
    event.preventDefault()
    console.log(event.target)
    
    const comment = event.target.comment.value
    const comments = blog.comments.concat(comment)
    event.target.comment.value = ""
    dispatch(addComment(comments, blog.id))
  };

  const commentElements = blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
  
  return (
    <>
      <form onSubmit={submitComment}>
        <TextField name="comment" label="comments" />
        <Button variant="contained" color="primary" type="submit">add comment</Button>
      </form>
      <ul>
        {commentElements}
      </ul>
    </>
  )
}

export default Comments