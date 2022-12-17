const router = require('express').Router()

const { userExtractor, blogFinder } = require('../util/middleware')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs =  await Blog.findAll()
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id})
  return res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  return res.json({ likes: req.blog.likes })
})

router.delete('/:id', blogFinder, userExtractor, async (req, res) => {
  if (req.blog && req.user.id === req.blog.userId) {
    await req.blog.destroy()
    res.status(204).end()
  } else if (req.blog) {
    throw new Error('user does not have authorization to delete this blog')
  }
})

module.exports = router