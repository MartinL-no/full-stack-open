import { useState, useEffect} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [anecdote, setAnecdote] = useState(anecdotes[selected])
  const [votes, setVotes] = useState(0)

  function randomAnecdote() {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  function vote() {
    setPoints(prevState => prevState.map((anecdoteVotes, index) => ( index === selected ?
        anecdoteVotes + 1 :
        anecdoteVotes
    )))
  }

  useEffect(() => {
    console.log(votes)
    setAnecdote(anecdotes[points.indexOf(Math.max(...points))])
    setVotes(points[points.indexOf(Math.max(...points))])
  }, [points, anecdotes, votes])

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={() => randomAnecdote()}>
          Change Anecdote
        </button>
        <button onClick={() => vote()}>
          vote
        </button>
      </div>

      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes </p>
    </div>
  )
}

export default App