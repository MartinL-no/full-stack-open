import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: null, style: null },
  reducers: {
    showNotification: (state, action) => {
      const message = action.payload

      return state = {
        message: message,
        style: true
      }
    },
    clearNotification: (state) => {
      return state = { content: null, style: null }
    }
  }
})

export const setNotification = (message, duration) => {
  return async dispatch => {
    const durationMilliseconds = `${duration}000`
    dispatch(showNotification(message))

    setTimeout(() => {
       dispatch(clearNotification(null))
    }, durationMilliseconds)
  }
}
export const { showNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer