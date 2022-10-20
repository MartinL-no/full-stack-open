import { useState } from "react"

const Blog = ({ blog, addLike }) => {
  const [detailsAreShown, setDetailAreShown] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleToggleDetails = () => {
    setDetailAreShown(!detailsAreShown)
  }

  const handleAddLike = () => {
    addLike(blog)
  }

  const details = () => (
    <>
      <p>{blog.url}</p>
      <p>{`${blog.likes} `}<button onClick={handleAddLike}>like</button></p>
      <p>{blog.user.name}</p>
    </>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} 
        {`${blog.author} `}
        <button onClick={handleToggleDetails}>view</button>
      </div>
      {detailsAreShown && details()}
    </div>  
  )
}

export default Blog