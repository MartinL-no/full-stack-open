import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { createNotification } from "./reducers/notificationReducer";

import "./index.css";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(createNotification("Wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      });
      dispatch(createNotification( `a new blog ${blogObject.title} by ${blogObject.author} added`, 5));
    } catch (exception) {
      console.log(exception);
    }
  };

  const addLike = (blogObject) => {
    try {
      blogService.replace(blogObject).then((returnedBlog) => {
        if (returnedBlog.id === blogObject.id) {
          setBlogs(
            blogs.map((blog) =>
              blog.id === blogObject.id
                ? { ...blog, likes: blog.likes + 1 }
                : blog
            )
          );
        }
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  const removeBlog = (blogObject) => {
    try {
      blogService.remove(blogObject.id).then((status) => {
        if (status === 204) {
          setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        }
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} id="new-blog-button">
      <BlogForm createBlog={addBlog} addLike={addLike} />
    </Togglable>
  );

  const blogElements = () => {
    const sortedBlog = blogs.sort((a, b) => b.likes - a.likes);

    return (
      <div className="blogs">
        {sortedBlog.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
            username={user.username}
          />
        ))}
      </div>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <Notification />
      {blogForm()}
      {blogElements()}
    </div>
  );
};

export default App;
