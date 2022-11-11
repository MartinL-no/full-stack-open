import { createSlice } from '@reduxjs/toolkit'

import blogService from "../services/blogs"
import loginService from "../services/login"

const loginSlice = createSlice({
  name: 'blog',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = loginSlice.actions

export const getLogin = () => {
  return async dispatch => {
    const loggedUserJSON = await window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(parsedUser.token);
      dispatch(setUser(parsedUser))
    }
  }
}

export const login = (username, password) => {
  console.log(username, password)
  return async dispatch => {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user))
  };
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch(setUser(null))
  }
}

export default loginSlice.reducer