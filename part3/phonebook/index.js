require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
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

app.post(`/api/persons`, (request, response) => {
    const body = request.body
    console.log(request.body)

    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const person = new Person({
        name: request.body.name,
        number: request.body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get(`/api/persons`, (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
      })
})


app.get(`/info`, (request, response) => {
    const date = new Date()
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.delete(`/api/persons/:id`, (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.get(`/api/persons/:id`, (request, response, next) => {
    Person.findById(request.params.id)
        .then(note => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put(`/api/persons/:id`, (request, response, next) => {
    const body = request.body
    
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
    }
    
    app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
