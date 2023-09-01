import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS, EDIT_NUMBER } from '../query'

const PhoneForm = ({ notify }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')


    const [changeNumber] = useMutation(EDIT_NUMBER, {
        onError: (err) => {
            const message = err.graphQLErrors[0].message
            notify(message)
        },
        refetchQueries: [{ query: ALL_PERSONS }]
    })

    const submit = (event) => {
        event.preventDefault()
        changeNumber({ variables: { name, phone } })
        setName('')
        setPhone('')
    }

    return (
        <div>
            <h2>change number</h2>
            <form onSubmit={submit}>
                <div>
                    name <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone <input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <button type='submit'>change number</button>
            </form>
        </div>
    )
}

export default PhoneForm