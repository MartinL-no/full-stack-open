const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((total, blog) => blog.likes + total, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const result = blogs.sort((a, b) => a.likes - b.likes).slice(-1)[0] 
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}