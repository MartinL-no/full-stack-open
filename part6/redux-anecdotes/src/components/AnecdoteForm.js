import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch({ type: 'anecdotes/storeAddAnecdote', payload: anecdote })
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