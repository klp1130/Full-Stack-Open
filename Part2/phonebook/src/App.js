import { useState, useEffect } from 'react'
import personService from './services/persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personToShow, setPersonToShow] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageState, setMessageState] = useState('Complete')

// Fetch person data from Json-Server
  useEffect(() => 
    personService
      .getAll() 
      .then((initialPersons) => {
        setPersons(initialPersons);
        setPersonToShow(initialPersons)
  }), [])

// Handle name change  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

// Handle number change   
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }


// Handle submit
  const submit = (event, number) => {
   // event.preventDefault()
    const checkIfNameExists = persons.filter(persons => persons.name === newName)
    if (checkIfNameExists.length !== 0) {
      const id = checkIfNameExists[0].id
      if (window.confirm(`${newName} is already in you phonebook, replace old number is a new number?`)) {
        const personFound = persons.find(z => z.id === id)
        const changedPerson = {...personFound, number: number}

        personService.update(id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setPersonToShow(persons.map(p => p.id !== id? p : returnedPerson))
        }).catch(error => {
          setErrorMessage(`Contact info for ${newName} has alreadt been removed from server`)
          setMessageState('error')
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== id))
          setPersonToShow(personToShow.filter(p => p.id !== id))
        })
      }
      setErrorMessage(`Modified number for ${newName}`)
      setMessageState(`success`)
      setTimeout(() => setErrorMessage(null), 5000)
      setNewName('')
      setNewNumber('')
    } else {
        const personObj = {
          name: newName,
          number: newNumber
        }
        
        personService
          .create(personObj)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setPersonToShow(persons.concat(returnedPerson))

              setErrorMessage(`Add ${newName}`)
              setMessageState('succes')
              setTimeout(() => {setErrorMessage(null)}, 500)
              setNewName('')
              setNewNumber('')
              })
              .catch(error => {
              setErrorMessage(error.response.data)
              setMessageState('error')
              setTimeout(() => {setErrorMessage(null)}, 5000)
              setNewName('')
              setNewNumber('')
            })
    }
  }

// Handle filter change    
  const filterContent = (event) => {
    const showPerson = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()) === true)
    setPersonToShow(showPerson)
  }

  const deletePerson = (event, id, name) => {
    event.preventDefault()
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id).then(response => {
        setPersons(persons.filter(p=> p.id !==id))
        setPersonToShow(personToShow.filter(p => p.id !== id))
      })
    }
  }
  
 
  
  return (
    <div>
      <h2>Phonebook</h2>   

      <Notification 
        message={errorMessage} 
        messageState={messageState} 
      />  

      <Filter filterContent={filterContent} /> 
           
      <PersonForm
         submit={submit} 
         newName= {newName} 
         handleNameChange={handleNameChange} 
         newNumber={newNumber} 
         handleNumberChange={handleNumberChange} 
         />
      <h2>Numbers</h2>
        {personToShow.map((person, i) => {
          return (
              <div key={i}>
                <span>{person.name} {person.number}</span>
                <button onClick = {(event) => deletePerson(event, person.id, person.name)}>delete</button>
              </div>
          )
        })}
    </div>
  )
}

export default App