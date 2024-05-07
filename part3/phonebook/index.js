const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(express.json())

app.use(morgan('tiny'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

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

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
    var time = Date(Date.now())
    var people = persons.length
    response.send(`<p>Phonebook has info for ${people} people.</br>${time}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.statusMessage = "Object not found";
        response.status(400).end();
    }    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(e => e.id))
      : 0
    return Math.random(maxId+1, 9999)
}

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
    
    if(persons.filter((elem) => elem.name == body.name).length != 0){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.use(unknownEndpoint)

const PORT = 3002
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
})