const router = require('express').Router()

const { userExtractor, blogFinder } = require('../util/middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const blogs =  await Blog.findAll({
    include: {
      model: User,
      attributes: ['id', 'username', 'name']
    },
  })
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id})
  return res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  const blog = await Blog.findByPk(
    req.params.id,
    {
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['id', 'username', 'name']
      }
    }
  )
  if (blog) {
    res.json(blog)
  } else {
    throw new Error('blog does not exist')
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
  } else if (req.blog && req.user.id !== req.blog.userId) {
    throw new Error('user does not have authorization to delete this blog')
  } else {
    throw new Error('blog does not exist')
  }
})

module.exports = router