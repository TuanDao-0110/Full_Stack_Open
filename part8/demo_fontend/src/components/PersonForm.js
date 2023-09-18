import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS, CREATE_PERSON } from '../query'



const PersonForm = ({ notify }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')


    const [createPerson] = useMutation(CREATE_PERSON, {
        // this is help to call all_person everytime this createPerson is called, we can add more query
        // refetchQueries: [{ query: ALL_PERSONS }],
        // onError: (err) => {
        //     const messages = err.graphQLErrors[0].message
        //     notify(messages)
        // }
        onError: (error) => {
            const errors = error.graphQLErrors[0].extensions.error.errors
            const messages = Object.values(errors).map(e => e.message).join('\n')
            notify(messages)
        },
        // this can be use as replacement for refetchQueries
        update: (cache, response) => {
            cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
                return {
                    allPersons: allPersons.concat(response.data.addPerson),
                }
            })
        },
    
    })
    const submit = async (event) => {
        event.preventDefault()
        createPerson({ variables: { name, phone, street, city } })
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    name <input value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone <input value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <div>
                    street <input value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <div>
                    city <input value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <button type='submit'>add!</button>
            </form>
        </div>
    )
}

export default PersonForm