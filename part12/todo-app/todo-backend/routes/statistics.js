const express = require('express');
const router = express.Router();

const redis = require('../redis')

router.get('/', async (req, res) => {
  const added_todos = Number(await redis.getAsync('added_todos'))

  res.send({
    added_todos
  });
});

module.exports = router;