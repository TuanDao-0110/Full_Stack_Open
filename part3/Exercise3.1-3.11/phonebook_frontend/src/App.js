import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import { deleteData, getData, postNewdata, updateData } from './API'
import Message from './Message/Message'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [number, setNewNumber] = useState(0)
  const [systermMessage, setSytermMessage] = useState({
    display: false,
    message: '',
    type: ''
  })
  useEffect(() => {
    getData(setPersons)
  }, [])

  const hanldeNewNote = (e) => {
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let newPerson = { name: newName, number }
      postNewdata(newPerson, setNewName, setNewNumber, setSytermMessage)
    
  }

  const renderPersons = (arr) => {
    return arr.map((item, index) => {
      const { number, id, name, } = item
      return <p key={index}>

        {name} {number}
        <span><button onClick={() => { deleteData(id, name, setPersons, persons, setSytermMessage) }}>delete</button></span>
      </p>
    })
  }

  const handleNewFilter = (e) => {
    setFilterName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Message systermMessage={systermMessage} />
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