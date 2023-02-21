import axios from "axios"

class Message {

    constructor(message, type,) {
        this.message = message
        this.type = type
        this.display = true
    }

    setSytermMessage() {
        return {
            message: this.message, type: this.type, display: this.display
        }
    }
    setTimeout() {
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
}

export const getData = (setState) => {
    axios
        .get('/api/persons')
        .then(response => {
            if (response.status === 200) {
                setState(response.data)
            }
        }).catch(error => alert(`${error.message}`))
}

export const postNewdata = (data, setNewName, setNewNumber, setSytermMessage) => {
    axios.post('/api/persons', data).then(response => {
        if (response.status === 201) {
            setNewName('')
            setNewNumber(0)
            let message = new Message(`${data.name} is already added to phonebook`, 'success')
            setSytermMessage(message.setSytermMessage())
            message.setTimeout()
        }
       
    }).catch(error => {
        console.log(error)
        let message = new Message(`${error.response.data}`, 'error')
        setSytermMessage(message.setSytermMessage())
    })
}

export const deleteData = (id, name, setPersons, persons, setSytermMessage) => {
    axios.delete(`/api/persons/${id}`).then(
        response => {
            if (response.status === 204) {
                let message = new Message(`${name} deleted`, 'success')
                setSytermMessage(message.setSytermMessage())
                message.setTimeout()
            }
        }
    ).catch(error => {
        let message = new Message(`the note '${error.response.data}' was already deleted from server`, 'error')
        setSytermMessage(message.setSytermMessage())

        setPersons(persons.filter(n => n.id !== id))
    })
}
