import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const id = useParams().id;
  const user = useSelector(state => state.user.find(u => u.id === id));
  if (!user) {
    return null
  }
  
  const blogs = user.blogs.map(blog => {
    return (
      <li key={blog.id}>{blog.title}</li>
  )})
  
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs}
      </ul>
    </div>
  )
}

export default User