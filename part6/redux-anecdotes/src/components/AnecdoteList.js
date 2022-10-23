import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = ({ id, content }) => {
    dispatch({ type: 'anecdotes/storeVote', payload: id })
    dispatch({ type: 'notification/showNotification', payload: content })
    setTimeout(() => {
      dispatch({ type: 'notification/hideNotification', payload: null })
    }, "5000")
  }

  return (
    <>
      {anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList