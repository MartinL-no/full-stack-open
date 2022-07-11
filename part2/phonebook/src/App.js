import { useState, useEffect } from 'react'

import personsServices from "./services/persons"

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
  const { namesToShow, handleDelete} = props

  return (
    namesToShow.map((person, index) => {

      return (
        <div key={index}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      )
    })
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    personsServices
      .getAll()
      .then(data => setPersons(data))
  }, [persons])

  const namesToShow = !filter
    ? persons
    : persons.filter(person => person.name.match(filter))

    const handleFilter = (event) => {
      setFilter(event.target.value)
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const duplicateIndex = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
    const newPerson = {name: newName, number: newNumber}
    
    if(duplicateIndex !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsServices
          .update(duplicateIndex + 1, newPerson)
          .then(data => setPersons(prevState => prevState.map((person, index) => (
            index === duplicateIndex
            ? newPerson
            : person
          ))))
          setNewName("")
          setNewNumber("")
      }
      setNewName("")
      setNewNumber("")
    } else {
      personsServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("DO you want to delete this entry?")) {
      personsServices
        .deleteItem(id)
      personsServices
        .getAll()
        .then(data => setPersons(data))
    }
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
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App