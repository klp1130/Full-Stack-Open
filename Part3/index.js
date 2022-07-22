const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

/// Middleware request logger
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.use(express.json())

app.use(cors())

app.use(express.static('build'))


app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req,res, 'content-length'),'-',
    tokens['response-time'](req,res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


/// GET: an event handler that is used to handle GET made a /root:
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

/// GET for how many entries are in the phone book + date/time
app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  Person.find({}).then(persons => {
    response.send(
      `<div>
          <span>phone book has info for ${persons.length} people</span></div>
        <span>${currentDate} (${timeZone})</span>`,
    )
  })
})


// Event handler for fetching all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

/// GET: used to get a specific person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/// POST: Add new contact
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // id data for name is missing, server will respond with 400 bad request
  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  // id data for number is missing, server will respond with 400 bad request
  if (body.number === undefined) {
    return response.status(400).json({
      error: 'missing number'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  }).catch(error => next(error))
})

/// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/// PUT : Updating a Person
app.put('api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidiationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


