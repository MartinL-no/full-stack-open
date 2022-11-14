import { createSlice } from '@reduxjs/toolkit'

import blogService from "../services/blogs"
import loginService from "../services/login"
import { createNotification } from "../reducers/notificationReducer";

const loginSlice = createSlice({
  name: 'login',
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
  return async dispatch => {
    let user
    try {
      user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      dispatch(createNotification("Wrong username or password", "warning", 5));
    }

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