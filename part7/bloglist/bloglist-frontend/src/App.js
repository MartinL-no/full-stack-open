import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./index.css";

import { getLogin, logout } from "./reducers/loginReducer";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getLogin())
  }, []);

  const handleLogout = () => {
    dispatch(logout(null))
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} id="new-blog-button">
      <BlogForm />
    </Togglable>
  );


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
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
      <BlogList user={user.username}/>
    </div>
  );
};

export default App;
