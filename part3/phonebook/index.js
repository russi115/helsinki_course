require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

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

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
    var time = Date(Date.now())
    Person.find({}).then( people => {
        response.send(`<p>Phonebook has info for ${people.length} people.</br>${time}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then( persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'Name missing' 
        })
    } else if(!body.number){
        return response.status(400).json({ 
        error: 'Number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3002
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
})