import { configureStore } from '@reduxjs/toolkit'

import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import loginReducer from './reducers/loginReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    login: loginReducer
  }
})