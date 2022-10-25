import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, style: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      if (state.timer) {
        clearTimeout(state.timer)
      }
      const message = action.payload

      return state = {
        message: message,
        style: true
      }
    },
    clearNotification: (state) => {
      return initialState
    }
  }
})

let timeoutId
export const setNotification = (message, duration) => {
  return dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
  dispatch(showNotification(message))
  const durationMilliseconds = `${duration}000`
  timeoutId = setTimeout(()=> dispatch(clearNotification(null)), durationMilliseconds)
  }
}
export const { showNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer