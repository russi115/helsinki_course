require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()
app.use(express.json())

app.use(morgan(function (tokens, req, res) {
    if(req.method == 'POST'){
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ].join(' ')
}))

app.use(express.static('dist'))
app.use(cors())


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }

    next(error)
  }

app.get('/info', (request, response, next) => {
    var time = Date(Date.now())
    Person.find({})
    .then( people => {
        response.send(`<p>Phonebook has info for ${people.length} people.</br>${time}</p>`)
    })
    .catch(e => next(e))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then( persons => {
        response.json(persons)
    })
    .catch(e => next(e))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(e => next(e))
  })

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then( () => {
    response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(e => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body
  
    Person.findByIdAndUpdate(
        request.params.id,
        {name, number},
        { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
})