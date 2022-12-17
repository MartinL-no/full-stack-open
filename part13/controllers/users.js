const router = require('express').Router()
const bcrypt = require('bcrypt')

const { userExtractor } = require('../util/middleware')
const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] },
  })

  res.json(users)
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