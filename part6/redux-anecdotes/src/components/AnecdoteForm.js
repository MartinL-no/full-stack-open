import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.setNotification(`you voted '${content}'`, 10)
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

const mapStateToProps = (state) => state

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm