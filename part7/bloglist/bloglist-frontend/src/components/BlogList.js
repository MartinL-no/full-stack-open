import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector(state => [...state.blog].sort((a, b) => b.likes - a.likes))
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </>
  );
}

export default BlogList