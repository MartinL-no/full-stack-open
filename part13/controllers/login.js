const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')
const { User, Sessions } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username,
      disabled: false
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  
  if (!(user && passwordCorrect)) {
    throw new Error('invalid username or password')
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Sessions.create({
    token,
    userId: user.id
  })

  console.log(Sessions.findAll())

  res.status(200).send({
      token,
      username: user.username,
      name: user.name
    })
})

module.exports = router