import { useState, useEffect } from 'react'
import './index.css'

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
  const { namesToShow, handleDelete } = props

  return (
    namesToShow.map((person) => {
      return (
        <div key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      )
    })
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='added'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [triggerRender, setTriggerRender] = useState(false)

  useEffect(()=> {
    personsServices
      .getAll()
      .then(data => setPersons(data))
  }, [triggerRender])

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
    const duplicate = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    
    const newPerson = {
      id: duplicate[0].id,
      name: newName,
      number: newNumber
    }
    
    if(newPerson.id) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsServices
          .update(newPerson.id, newPerson)
          .then(data => {
            setPersons(prevState => (
              prevState.map(person => (
                person.id === data.id
                ? data
                : person
              ))
            ))
          })
          setNewName("")
          setNewNumber("")
      }
      setNotification(
        `Added ${newName}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        setNewName("")
        setNewNumber("")
    } else {
      personsServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification(
            `Added ${newName}`
            )
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this entry?")) {
      personsServices
        .deleteItem(id)
        .catch(() => {
          setError(
            `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 3000)
        })
      personsServices
      .getAll()
      .then(data => setPersons(data))
      setTriggerRender(!triggerRender)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
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
        persons={persons}
      />

    </div>
  )
}

export default App