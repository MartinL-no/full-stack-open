const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper');
const app = require('../app')
const api = supertest(app)

const Blog = require ('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('notes are returned as json', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})