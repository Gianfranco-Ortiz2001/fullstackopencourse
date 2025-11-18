import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (newName, newNumber) => {
    const _name = {
      name: newName,
      number: newNumber
    }
    personService
      .create(_name)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${response.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .hakai(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          alert(`The person ${person.name} has been deleted`)
        })
        .catch(error => {
          alert(`The person ${person.name} was already deleted from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const updatePersonNumber = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Updated ${returnedPerson.name}'s number`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationMessage(`Information on ${person.name} has already been removed from server`)
        setIsError(true)
        setTimeout(() => {
          setNotificationMessage(null)
          setIsError(false)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleForm = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const confirmChange = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmChange) {
        updatePersonNumber(existingPerson, newNumber)
      }
    }
    else {
      addPerson(newName, newNumber)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleForm={handleForm}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App