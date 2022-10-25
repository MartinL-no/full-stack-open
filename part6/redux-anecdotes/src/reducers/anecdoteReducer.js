import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToUpdate = anecdotes.filter(anecdote => anecdote.id === id)[0]
    const anecdoteObject = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdoteObject)

    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer