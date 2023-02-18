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
        .get('http://localhost:3001/persons')
        .then(response => {
            if (response.status === 200) {

                setState(response.data)
            }
        }).catch(error => alert(`${error.message}`))
}

export const postNewdata = (data, setNewName, setNewNumber, setSytermMessage) => {
    axios.post('http://localhost:3001/persons', data).then(response => {
        if (response.status === 201) {
            setNewName('')
            setNewNumber(0)
            let message = new Message(`${data.name} is already added to phonebook`, 'success')
            setSytermMessage(message.setSytermMessage())
            message.setTimeout()


        }
    }).catch(error => {
        let message = new Message(`${data.name} fail to add to phonebook`, 'error')
        setSytermMessage(message.setSytermMessage())
        message.setTimeout()

    })
}

export const deleteData = (id, name, setPersons, persons, setSytermMessage) => {
    axios.delete(`http://localhost:3001/persons/${id}`).then(
        response => {
            if (response.status === 200) {
                let message = new Message(`${name} deleted`, 'success')
                setSytermMessage(message.setSytermMessage())
                message.setTimeout()
            }
        }
    ).catch(error => {
        let message = new Message(`the note '${name}' was already deleted from server`, 'error')
        setSytermMessage(message.setSytermMessage())
        setPersons(persons.filter(n => n.id !== id))
    })
}
export const updateData = (id, newData, setSytermMessage) => {
    axios.put(`http://localhost:3001/persons/${id}`, newData).then(
        response => {
            if (response.status === 200) {
                let message = new Message(`${newData.name} have been updated`, 'success')
                setSytermMessage(message.setSytermMessage())
                message.setTimeout()

            }
        }
    ).catch(error => {
        let message = new Message(`${newData.name} have been fail to update`, 'error')
        setSytermMessage(message.setSytermMessage())
        message.setTimeout()
    })
}