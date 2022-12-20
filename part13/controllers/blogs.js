const router = require('express').Router()
const { Op } = require('sequelize')

const { authenticate, blogFinder } = require('../util/middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` }},
        { author: { [Op.iLike]: `%${req.query.search}%` }},
      ]
    }
  }

  const blogs =  await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'name']
      },
    ],
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.post('/', authenticate, async (req, res) => {
  const body = req.body
  const currentYear = new Date().getFullYear()

  if (body.year < 1991 || body.year > currentYear) {
    throw new Error('Year must be between 1991 and current year')
  }

  const blog = await Blog.create({ ...body, userId: req.user.id})
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

router.delete('/:id', authenticate, blogFinder, async (req, res) => {
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