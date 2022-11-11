import { useState } from "react";
import { useDispatch } from 'react-redux'
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = { title, author, url };
    dispatch(createBlog(blogObject))

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            id="title-input"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            id="author-input"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            id="url-input"
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </>
  );
};
export default BlogForm;
