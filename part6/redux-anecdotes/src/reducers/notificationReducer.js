import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { text: null, style: null},
  reducers: {
    showNotification: (state, action) => {
      const anecdote = action.payload
      return state = {
        text: `you voted ${anecdote}`,
        style: true
      }
    },
    hideNotification: (state) => {
      return state = { text: null, style: null}
    }
  }
})

export default notificationSlice.reducer