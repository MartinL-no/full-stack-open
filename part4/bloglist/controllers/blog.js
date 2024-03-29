const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  try {
  const body = request.body
  const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (blog == null) {
      return response.status(400).json({ error: 'the blog post does not exist' })
    } else if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'user does not have authority to delete this blog post' })
    } else if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    }

  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter