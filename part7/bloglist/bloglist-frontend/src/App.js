import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import "./index.css";

import { initializeBlogs } from "./reducers/blogReducer";
import { getLogin, logout } from "./reducers/loginReducer";
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog";
import Users from "./pages/Users";
import User from "./pages/User";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);

  useEffect(() => {
    dispatch(getLogin())
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);


  const handleLogout = () => {
    dispatch(logout(null))
  };

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

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />}/>
        <Route path="/blogs/:id" element={<Blog />}/>
      </Routes>
    </div>
  );
};

export default App;
