import { useDispatch } from 'react-redux'

import anecdoteService from '../services/anecdotes'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createAnecdote(content)
    
    dispatch(appendAnecdote(newAnecdote))
    dispatch(showNotification({ content: content, message: 'added'}))
    setTimeout(() => {
      dispatch(hideNotification(null))
    }, "5000")
  }
  return (
    <>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input
              type="text"
              name="anecdote"
            />
          </div>
          <button type="submit">create</button>
        </form>
    </>
  )
}

export default AnecdoteForm