require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan('tiny'))
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        `${JSON.stringify(res.req.body)}`
    ].join(' ')
  }))

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
    Person.find({}).then(notes => {
        response.json(notes)
      })
})

app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
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

// app.post(`/api/persons`, (request, response) => {
//     const personDetails = request.body
//     const duplicate = persons.some(person => {
//         return person.name.toLowerCase() === personDetails.name.toLowerCase()
//     })
    
//     if (personDetails.name && personDetails.number && !duplicate) {
//         persons = persons.concat({
//             id: Math.floor(Math.random() * 1000),
//             name: personDetails.name,
//             number: personDetails.number
//         })
//         response.json(personDetails)
//     } else if (!personDetails.name) {
//         response.status(400).json({ 
//             error: 'name must be included' 
//         })
//     } else if (!personDetails.number) {
//         response.status(400).json({ 
//             error: 'number must be included' 
//         }) 
//     } else if (duplicate) {
//         response.status(400).json({ 
//             error: 'name must be unique' 
//         })
//     }
// })

app.post(`/api/persons`, (request, response) => {
    const person = new Person({
        name: request.body.name,
        number: request.body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete(`/api/persons/:id`, (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
