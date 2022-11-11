import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

import { initializeBlogs } from '../reducers/blogReducer';
import Blog from "./Blog";

const BlogList = (username) => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => [...state.blog].sort((a, b) => b.likes - a.likes))

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs]);

  return (
    <div className="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          username={username}
        />
      ))}
    </div>
  );
}

export default BlogList