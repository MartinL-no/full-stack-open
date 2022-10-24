import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    filterAnecdotes: (state, action) => {
      const input = action.payload.input.toLowerCase()
      const anecdotes = action.payload.anecdotes
      const filteredAnecdotes = anecdotes.filter(anecdote => {
      const content = anecdote.content.toLowerCase()
      return content.includes(input)
      })
      const filteredAnecdotesIds = filteredAnecdotes.map(anecdote => anecdote.id)

      return state = filteredAnecdotesIds
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer