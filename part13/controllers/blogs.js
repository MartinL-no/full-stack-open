const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.note = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs =  await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  req.note.likes = req.body.likes
  return res.json({ likes: req.note.likes })
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).end()
})

module.exports = router