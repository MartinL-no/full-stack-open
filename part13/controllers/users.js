const router = require('express').Router()
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const { userExtractor } = require('../util/middleware')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
    include: {
      model: Blog,
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
    },
  })

  res.json(users)
})

router.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }

  if ( req.query.read ) {
    read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id','passwordHash','createdAt','updatedAt'] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId','createdAt','updatedAt'] },
        through: {
          attributes: ['read','id'],
          where: {
            read
          }
        }
      }
    ]
  })

  res.json(user)
})

router.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = await User.create({
    username: body.username,
    name: body.name,
    passwordHash
  })

  res.json({
    username: user.username,
    user: user.name
  })
})

router.put('/:username', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  if (user === null ) {
    res.status(404).end()
  } else {
    user.username = body.username
    await user.save()

    res.json({
      username: user.username,
      user: user.name
    })
  }
})

module.exports = router