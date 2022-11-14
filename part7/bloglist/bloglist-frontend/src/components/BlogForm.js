import { Button, TextField } from "@mui/material";
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
          <TextField
            type="text"
            value={title}
            name="Title"
            label="Title"
            onChange={handleTitleChange}
            id="title-input"
          />
        </div>
        <div>
          <TextField
            type="text"
            value={author}
            name="Author"
            label="Author"
            onChange={handleAuthorChange}
            id="author-input"
          />
        </div>
        <div>
          <TextField
            type="text"
            value={url}
            name="Url"
            label="Url"
            onChange={handleUrlChange}
            id="url-input"
          />
        </div>
        <Button variant="contained" color="primary" type="submit" id="create-blog-button">
          create
        </Button>
      </form>
    </>
  );
};
export default BlogForm;
