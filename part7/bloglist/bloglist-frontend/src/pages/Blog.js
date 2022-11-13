import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"

import { likeBlog } from "../reducers/blogReducer";
import Comments from "../components/Comments";

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id;
  const blog = useSelector(state => state.blog.find(b => b.id === id));

  const handleAddLike = () => {
    dispatch(likeBlog(blog))
  };

  if (!blog) {
    return null
  };

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={handleAddLike}>like</button></p>
      <p>added by {blog.author}</p>
      <Comments />
    </>
  )
}

export default Blog