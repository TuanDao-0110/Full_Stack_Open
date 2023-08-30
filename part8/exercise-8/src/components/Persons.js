import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_PERSON } from '../query'

const Person = ({ person, onClose }) => {
    return (
        <div>
            <h2>Name: {person.name}</h2>
            <div>
                address: {person.address.street} {person.address.city}
            </div>
            <div>phone: {person.phone}</div>
            <button onClick={onClose}>close</button>
        </div>
    )
}

const Persons = ({ persons, notify }) => {
    const [nameToSearch, setNameToSearch] = useState(null)
    const [result, { called, data, loading }] = useLazyQuery(FIND_PERSON, {
        variables: { nameToSearch },
        // Here's a breakdown of the logic:
        //If nameToSearch is falsy(null, undefined, empty string, etc.), !nameToSearch will be true, and the query execution will be skipped.This can be helpful if you don't want to execute the query until a valid search name is provided.
        // If nameToSearch is truthy(it has a value), then!nameToSearch will be false, and the query execution will not be skipped.The query will be executed with the provided variables.
        // In summary, the skip option allows you to conditionally control whether a query should be executed based on the availability of certain data or conditions.This can help improve the efficiency of your application by avoiding unnecessary API requests.
        skip: !nameToSearch,
    })
    if (nameToSearch) {
        if (called && loading) return <p>Loading ...</p>
        if (data && !loading) return (
            <Person
                person={data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        )
    }

    return (
        <div>
            <h2>Persons</h2>
            {persons.map((p, index) => (
                <div key={index}>
                    {p.name} {p.phone}
                    <button onClick={() => {
                        result()
                        setNameToSearch(p.name)
                    }}>
                        show address
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons