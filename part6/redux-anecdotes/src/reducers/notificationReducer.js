import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: null, style: null },
  reducers: {
    showNotification: (state, action) => {
      const content = action.payload.content
      const message = action.payload.message

      return state = {
        content: `you ${message} ${content}`,
        style: true
      }
    },
    hideNotification: (state) => {
      return state = { content: null, style: null }
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer