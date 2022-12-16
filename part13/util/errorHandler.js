const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'Issue with the blog post' })
  }

  if (error.message === "Cannot set properties of null (setting 'likes')") {
    return response.status(400).send({ error: 'blog does not exist' })
  }

  next(error)
}

module.exports = { errorHandler }