import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleChange = (event) => {
      const input = event.target.value
      dispatch({ type: 'filter/filterAnecdotes', payload: { input: input, anecdotes: anecdotes }})
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter