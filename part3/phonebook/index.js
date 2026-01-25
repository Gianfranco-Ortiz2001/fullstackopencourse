const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('dist'))

app.use(express.json())
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req)
  ].join(' ')
}))

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

//Get a list of all the persons in the array
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//Get one single contact
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  }
  else {
    res.statusMessage = 'That person does not exist... but keep trying'
    res.status(404).end()
  }
})

//Get info about the api
app.get('/info', (req, res) => {
  const now = new Date()
  res.send(`
    <div>
      <div>Phonebook has info for ${persons.length} people</div>
      <div>${now.toString()}</div>
    </div>
    `)
})

//Delete a single person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  if (persons.some(p => p.id === id)) {
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  }
  else {
    res.statusMessage = 'That person does not exist... good job, its gone already :D'
    res.status(404).end()
  }
})

//Add a person and number
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Name missing Mr John Doe'
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'Number missing... dont worry Im bad with numbers too'
    })
  } else if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'Name already in the phonebook'
    })
  } else {
    const person = {
      "id": String(Math.floor(Math.random() * (65535 - 5) + 5)),
      "name": body.name,
      "number": body.number
    }
    persons = persons.concat(person)
    res.json(person)
  }
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})