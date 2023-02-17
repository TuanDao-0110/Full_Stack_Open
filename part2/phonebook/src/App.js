import { useState ,useEffect} from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [number, setNewNumber] = useState(0)
useEffect(()=> { 
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
},[])

  const hanldeNewNote = (e) => {
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    let newPerson = { name: newName, number }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber(0)
    alert(`${newName} is already added to phonebook`)


  }

  const renderPersons = (arr) => {
    return arr.map((item, index) => {
      return <h3 key={index}> {item.name} {item.number}</h3>
    })
  }

  const handleNewFilter = (e) => {
    setFilterName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter handleNewFilter={handleNewFilter} filterName={filterName} />
      </div>
      <PersonForm hanldeNewNote={hanldeNewNote} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} newName={newName} number={number} />
      <h2>Numbers</h2>
      <Persons renderPersons={renderPersons} filterName={filterName} persons={persons} k />
    </div>
  )
}

export default App