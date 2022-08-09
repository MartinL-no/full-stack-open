const dummy = (blogs) => {
  return 1
}

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const totalLikes = (blogs) => {
  const test = blogs.reduce((total, blog) => {
    return blog.likes + total
  }, 0)
  return test
}

module.exports = {
  dummy,
  totalLikes
}