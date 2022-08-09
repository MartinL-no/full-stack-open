const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
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

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('most likes', () => {
  const blogArray = [
    {
      title:  "string reduction",
      author: " Dijkstra",
      likes: 12
    },
    {
      title: "Canonisdasdsadasdcal string reduction",
      author: "Edssdasdsadsdsassssger W. Dijkstra",
      likes: 29
    },
    {
      title: "Canonicawqwqwq  qwq wl string reduction",
      author: "Edsgeqqqqqqqqqqqqqr Wq. Dijkstra",
      likes: 9
    }
  ]

  test('find blog with highest amount of likes, then return it', () => {
    const result = listHelper.favoriteBlog(blogArray)
    expect(result).toEqual({
      title: "Canonisdasdsadasdcal string reduction",
      author: "Edssdasdsadsdsassssger W. Dijkstra",
      likes: 29
    })
  })
})