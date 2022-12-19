const router = require('express').Router()

const { ReadingLists } = require('../models')

router.get('/', async (req, res) => {
  const readingLists = await ReadingLists.findAll({
    attributes: { exclude: ['id','read'] },
  })

  res.json(readingLists)
})

module.exports = router