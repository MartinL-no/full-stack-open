const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blog posts saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is "id"', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog post', () => {
  test('a valid blogpost can be added', async () => {
    const newBlog = {
      title: 'Blahdy blah blah blog post',
      author: 'JooJoo',
      url: 'http://www.bumbledumble.com',
      likes: 72
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).toContain(
      'Blahdy blah blah blog post'
      )
    })
    
  test('if likes property is missing from request it defaults to zero', async () => {
    const newBlog = {
      title: 'Blahdy blah blah blog post',
      author: 'JooJoo',
      url: 'http://www.bumbledumble.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const newBlogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes
  
    expect(newBlogLikes).toBe(0)
  })

  test('if title is missing return from the request data, the status code 400 is returned', async () => {
    const newBlog = {
      author: 'JooJoo',
      url: 'http://www.bumbledumble.com',
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if url is missing return from the request data, the status code 400 is returned', async () => {
    const newBlog = {
      title: 'Blahdy blah blah blog post',
      author: 'JooJoo',
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('updating a blog post', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const uneditedBlog = blogsAtStart[0]
    const editedBlog = { ...uneditedBlog, likes: 99999999999999 }

    await api
      .put(`/api/blogs/${uneditedBlog.id}`)
      .send(editedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    const blogslikes = blogsAtEnd.map(blog => blog.likes)

    expect(blogslikes).not.toContain(uneditedBlog.likes)
    expect(blogslikes).toContain(editedBlog.likes)
  })

  test('fails with status code 400 if blog post does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const uneditedBlog = blogsAtStart[0]
    const editedBlog = { ...uneditedBlog, likes: 99999999999999, id: 'wrongID' }

    await api
      .put(`/api/blogs/${editedBlog.id}`)
      .send(editedBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    const blogslikes = blogsAtEnd.map(blog => blog.likes)

    expect(blogslikes).not.toContain(editedBlog.title)
  })
})

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Test User',
      password: 'testUserPassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('addition of a new user', () => {
  test('fails with status code 400 if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Duplicate User',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'username must be unique' })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails with status code 400 if password is less than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Test User',
      password: '',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'password must be longer than three characters' })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails with status code 400 if username is less than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Test User',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'username must be longer than three characters' })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})