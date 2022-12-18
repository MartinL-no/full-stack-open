const router = require('express').Router()
const sequelize = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs =  await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [['likes', 'DESC']]
  })

  res.json(blogs)
})

module.exports = router