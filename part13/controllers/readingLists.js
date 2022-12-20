const router = require('express').Router()

const { ReadingLists } = require('../models')
const { authenticate, blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  const readingLists = await ReadingLists.findAll({
    attributes: { exclude: ['id','read'] },
  })

  res.json(readingLists)
})

router.post('/:id', authenticate, blogFinder, async (req, res) => {
  if (!req.blog) {
    throw new Error('blog does not exist')
  }

  const readingList = await ReadingLists.create({
    blogId: req.blog.id,
    userId: req.user.id
  })

  return res.json(readingList)
})

router.put('/:id', authenticate, async (req, res) => {
  const body = req.body

  const readingList = await ReadingLists.findOne({
    where: {
      userId: req.user.id,
      blogId: req.params.id
    }
  })

  if (!readingList) {
    throw new Error('Blog is not on users reading list')
  } else {
    readingList.read = body.read
    readingList.save()

    res.json(readingList)
  }
})

module.exports = router