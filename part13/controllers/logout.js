const router = require('express').Router()

const { Sessions } = require('../models')
const { authenticate } = require('../util/middleware')

router.delete('/', authenticate, async (req, res) => {
  await Sessions.destroy({
    where: { userId: req.user.id }
  })

  res.status(200).end()
})

module.exports = router