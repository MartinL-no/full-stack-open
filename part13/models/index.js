const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./reading_list')
const Sessions = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })

module.exports = {
  Blog, User, ReadingLists, Sessions
}