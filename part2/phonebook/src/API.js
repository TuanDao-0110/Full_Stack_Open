import axios from "axios"
export const getData = (setState) => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
            if (response.status === 200) {

                setState(response.data)
            }
        }).catch(error => alert(`${error.message}`))
}

export const postNewdata = (data, setNewName, setNewNumber) => {
    axios.post('http://localhost:3001/persons', data).then(response => {
        if (response.status === 201) {
            setNewName('')
            setNewNumber(0)
            alert(`${data.name} is already added to phonebook`)
            window.location.reload()
        }
    }).catch(error => alert(error.message))
}

export const deleteData = (id, name) => {
    axios.delete(`http://localhost:3001/persons/${id}`).then(
        response => {
            if (response.status === 200) {
                alert(`${name} deleted`)
                window.location.reload()
            }
        }
    ).catch(error => alert(error.message))
}
export const updateData = (id, newData) => {
    axios.put(`http://localhost:3001/persons/${id}`, newData).then(
        response => {
            if (response.status === 200) {
                alert(`${newData.name} have been updated`)
                window.location.reload()
            }
        }
    ).catch(error => alert(error.message))
}