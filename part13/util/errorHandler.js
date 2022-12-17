const errorHandler = (error, request, response, next) => {
  console.error("error message", error.message)
  console.error("error name", error.name)

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

  if (error.name === 'SequelizeUniqueConstraintError') {
    const sequelizeUniqueConstraintErrors = error.errors.reduce((acc, e) => acc += `${e.message} `, '')
    console.log('sequelizeUniqueConstraintErrors', sequelizeUniqueConstraintErrors)

    if (sequelizeUniqueConstraintErrors.includes('username must be unique')) {
      return response.status(400).send({ error: 'username must be unique' })
    }
  }

  if (error.name === 'SequelizeValidationError') {
    const SequelizeValidationError = error.errors.reduce((acc, e) => acc += `${e.message} `, '')

    if (SequelizeValidationError.includes('Validation isEmail on username failed')) {
      return response.status(400).send({ error: 'Validation isEmail on username failed' })
    }
  }




  next(error)
}

module.exports = { errorHandler }