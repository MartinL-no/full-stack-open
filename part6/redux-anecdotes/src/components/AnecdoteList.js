import { useSelector, useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === null) {
      return state.anecdotes
              .slice()
              .sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes
            .filter(anecdote => state.filter
                .includes(anecdote.id))
              .slice()
              .sort((a, b) => b.votes - a.votes)
  })

  const vote = ({ id, content }) => {
    dispatch(addVote(id))
    dispatch(showNotification({ content: content, message: 'voted' }))
    setTimeout(() => {
      dispatch(hideNotification(null))
    }, "5000")
  }

  return (
    <>
      {anecdotes.map(anecdote =>
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