import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  const {filter, handleFilter} = props

  return (
    <form>
        <div>
          filter shown with:
          <input
            value={filter}
            onChange={handleFilter}
          />
        </div>
      </form>
  )
}

const PersonForm = (props) => {
  const {newName, handleNameChange, newNumber, handleNumberChange, handleSubmit} = props

  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          </div>
          <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  const {namesToShow} = props

  return (
    namesToShow.map((person, index) => (
      <p key={index}>{person.name} {person.number}</p>
    ))
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    axios
      .get("http://localhost:3001/persons")
      .then(res => setPersons(res.data))
  }, [])

  const namesToShow = !filter
    ? persons
    : persons.filter(person => person.name.match(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons(prevState => prevState.concat([{name: newName, number: newNumber}]))
    setNewName("")
    setNewNumber("")
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter}
        handleFilter={handleFilter}
      />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons 
        namesToShow={namesToShow}
      />

    </div>
  )
}

export default App