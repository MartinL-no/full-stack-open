import { useRef } from "react";

import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Notification from "../components/Notification";

const Blogs = () => {
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} id="new-blog-button">
      <BlogForm />
    </Togglable>
  );

  return (
    <>
      <h2>create new</h2>
      <Notification />
      {blogForm()}
      <BlogList />
    </>
  )
}

export default Blogs