const jwt = require('jsonwebtoken')

const { SECRET } = require('./config')
const { User, Blog, Sessions } = require('../models')

const authenticate = async (req, res, next) => {
  let token
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  } else {
    throw new Error('invalid token')
  }

  const session = await Sessions.findOne({ where: { token } })
  
  if (session === null) {
    throw new Error('active session not found')
  }

  const decodedToken = jwt.verify(token, SECRET)
  const user = await User.findByPk(decodedToken.id)

  req.user = user
  
  next()
}

// const tokenExtractor = (req, res, next) => {
//     const authorization = req.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//       req.token = authorization.substring(7)
//     }

//   next()
// }

// const userExtractor = async (req, res, next) => {
//   const decodedToken = jwt.verify(req.token, SECRET)
//   const user = await User.findOne({ where: { username: decodedToken.username }})
  
//   req.user = user

//   next()
// }

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error("error message:", error.message)
  console.log(error)

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

  if (error.message === 'invalid signature') {
    return response.status(401).send({ error: 'token missing or invalid' })
  }

  if (error.message === 'invalid token') {
    return response.status(401).send({ error: 'token missing or invalid' })
  }

  if (error.message === "Cannot read properties of null (reading 'id')") {
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

  if (error.message === 'Year must be between 1991 and current year') {
    return response.status(400).send({ error: 'Year must be between 1991 and current year' })
  }

  if (error.message === 'active session not found') {
    return response.status(400).send({ error: 'active session not found' })
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

module.exports = { authenticate, blogFinder, errorHandler }