const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Monty',
    url: 'http://www.google.com',
    likes: 10
  },
  {
    title: 'HTML is easy',
    author: 'Piffle',
    url: 'http://www.nintendo.com',
    likes: 16540
  }
]

const blogsinDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => blogs.toJSON())
}

module.exports = {
  initialBlogs,
  blogsinDb
}