import { useState } from "react";
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch();
  const [detailsAreShown, setDetailAreShown] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleToggleDetails = () => {
    setDetailAreShown(!detailsAreShown);
  };

  const handleAddLike = () => {
    dispatch(likeBlog(blog))
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  };

  const details = () => (
    <>
      <p>{blog.url}</p>
      <p>
        {`${blog.likes} `}
        <button onClick={handleAddLike}>like</button>
      </p>
      <p>{blog.user.name}</p>
      {username.user === blog.user.username && (
        <button onClick={handleRemoveBlog}>remove</button>
      )}
    </>
  );

  return (
    <div className="blog" style={blogStyle}>
      <span>{blog.title} </span>
      <span>{blog.author} </span>
      <button onClick={handleToggleDetails}>view</button>
      {detailsAreShown && details()}
    </div>
  );
};

export default Blog;
