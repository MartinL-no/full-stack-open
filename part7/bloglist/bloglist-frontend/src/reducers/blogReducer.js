import { createSlice } from '@reduxjs/toolkit'

import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      const blog = action.payload

      return state.map(b => b.id === blog.id ? blog : b)
    },
    appendBlog(state, action) {
      state.concat(action.payload)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setBlog, appendBlog, deleteBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(appendBlog(createdBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const status = await blogService.remove(id)
    if (status === 204) {
      dispatch(deleteBlog(id))
    };
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.replace({...blog, likes: blog.likes + 1})
    dispatch(setBlog(updatedBlog))
  }
}

export const addComment = (comments, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(comments, id)
    dispatch(setBlog(updatedBlog))
  }
}

export default blogSlice.reducer