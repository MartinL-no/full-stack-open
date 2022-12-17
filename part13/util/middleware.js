const jwt = require('jsonwebtoken')

const { User, Blog } = require('../models')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findOne({ where: { username: decodedToken.username }})
  
  request.user = user

  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error("error message", error.message)

  if (error.message.includes('notNull Violation: blog.url cannot be null')) {
    return response.status(400).send({ error: 'blog url must be included' })
  }

  if (error.message.includes('notNull Violation: blog.title cannot be null')) {
    return response.status(400).send({ error: 'blog title must be included' })
  }

  if (error.message.includes("Cannot set properties of null (setting 'likes')")) {
    return response.status(400).send({ error: 'blog does not exist' })
  }

  if (error.message.includes('notNull Violation: user.username cannot be null')) {
    return response.status(400).send({ error: 'username must be included' })
  }

  if (error.message.includes('notNull Violation: user.name cannot be null end')) {
    return response.status(400).send({ error: 'name must be included' })
  }

  if (error.message === 'invalid token') {
    return response.status(401).send({ error: 'token missing or invalid' })
  }

  if (error.message === 'user does not have authorization to change this username') {
    return response.status(401).send({ error: 'user does not have authorization to change this username' })
  }

  if (error.message === 'user does not have authorization to delete this blog') {
    return response.status(401).send({ error: 'user does not have authorization to delete this blog' })
  }

  if (error.message === 'invalid username or password') {
    return response.status(401).send({ error: 'invalid username or password' })
  }

  if (error.message === 'blog does not exist') {
    return response.status(404).send({ error: 'blog does not exist' })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    const sequelizeUniqueConstraintErrors = error.errors.reduce((acc, e) => acc += `${e.message} `, '')

    if (sequelizeUniqueConstraintErrors.includes('username must be unique')) {
      return response.status(400).send({ error: 'username must be unique' })
    }
  }

  if (error.name === 'SequelizeValidationError') {
    const SequelizeValidationError = error.errors.map(e => e.message)

    return response.status(400).send({ error: SequelizeValidationError })
  }

  next()
}

module.exports = { tokenExtractor, userExtractor, blogFinder, errorHandler }