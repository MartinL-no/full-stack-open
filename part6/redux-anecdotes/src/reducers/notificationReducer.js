import { createSlice } from '@reduxjs/toolkit'

const initialState = 'This is a notification'

const noteSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return state
    }
  }
})

export default noteSlice.reducer