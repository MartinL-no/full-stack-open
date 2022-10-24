import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    show: true
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    storeVote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.filter(anecdote => anecdote.id === id)[0]
      const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }

      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
    },
    storeAddAnecdote(state, action) {
      const content = action.payload
      const anecdoteObject = asObject(content)
      
      return state.concat(anecdoteObject)  
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { storeVote, storeAddAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer