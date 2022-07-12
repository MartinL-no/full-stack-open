const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get(`/api/persons`, (request, response) => {
    response.send(persons)
})

app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.send(person)
    } else {
        response.status(404).end()
    }
})

app.get(`/info`, (request, response) => {
    const date = new Date()
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.post(`/api/persons`, (request, response) => {
    const personDetails = request.body
    const duplicate = persons.some(person => {
        return person.name.toLowerCase() === personDetails.name.toLowerCase()
    })
    
    if (personDetails.name && personDetails.number && !duplicate) {
        persons = persons.concat({
            id: Math.floor(Math.random() * 1000),
            name: personDetails.name,
            number: personDetails.number
        })
        response.json(personDetails)
    } else if (!personDetails.name) {
        response.status(400).json({ 
            error: 'name must be included' 
        })
    } else if (!personDetails.number) {
        response.status(400).json({ 
            error: 'number must be included' 
        }) 
    } else if (duplicate) {
        response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
})

app.delete(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})