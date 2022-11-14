import { useRef } from "react";

import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const Blogs = () => {
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef} id="new-blog-button">
      <BlogForm />
    </Togglable>
  );

  return (
    <>
      {blogForm()}
      <BlogList />
    </>
  )
}

export default Blogs