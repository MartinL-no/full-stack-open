import { connect } from 'react-redux'

import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
      const input = event.target.value
      props.filterAnecdotes({ input: input, anecdotes: props.anecdotes })
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  filterAnecdotes
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter