const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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

router.put('/:username', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    throw 'invalid token'
  }

  const user = await User.findOne({ where: { username: req.params.username }})

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