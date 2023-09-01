import React, { useEffect, useState } from 'react'
import { EDIT_NUMBER, GET_ALL_AUTHOR } from '../query';
import { useMutation } from '@apollo/client';

export default function EditAuthor({ author, yearBorn }) {

    const [editAuthor] = useMutation(EDIT_NUMBER, {
        onError: err => {
            const msg = err.graphQLErrors[0].message
            setErrMsg(msg)
        },
        refetchQueries: [{ query: GET_ALL_AUTHOR }]
    })
    const [errMsg, setErrMsg] = useState(null)
    const [name, setName] = useState('')
    const [setBornTo, setSetBornTo] = useState('')
    useEffect(() => {
        setName(author)
        setSetBornTo(yearBorn)
    }, [author, yearBorn])
    const submitEditAuthor = () => {
        editAuthor({ variables: { name, setBornTo } })
        setName('')
        setSetBornTo('')
    }
    const setNotify = () => {
        setTimeout(() => {
            setErrMsg(null)
        }, 5000)
        return <div style={{ color: 'red' }}>{errMsg}</div>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Set birth year</h2>
            {errMsg !== null && setNotify()}
            <div>
                author: <input type='text' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                number: <input type='number' value={setBornTo} onChange={e => setSetBornTo(Number(e.target.value))} />
            </div>
            <button style={{ width: 'fit-content' }} onClick={submitEditAuthor}>Update</button>
        </div>
    )
}
