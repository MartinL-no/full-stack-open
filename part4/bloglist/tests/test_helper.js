const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Monty',
    url: 'http://www.google.com',
    likes: 10
  },
  {
    title: 'Eat the apple',
    author: 'Piffle',
    url: 'http://www.nintendo.com',
    likes: 16540
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}