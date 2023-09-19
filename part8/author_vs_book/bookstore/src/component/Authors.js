import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_AUTHOR } from '../query';
import EditAuthor from './EditAuthor';

export default function Authors() {
    const result = useQuery(GET_ALL_AUTHOR)
    const [selectAuthor, setSelectAuthor] = useState('')
    const [selectYear, setSelectYear] = useState('')
    const Author = ({ author }) => {
        const { bookCount, born, name } = author
        return <tr key={name} style={{ cursor: 'pointer' }} onClick={() => {
            setSelectAuthor(name)
            setSelectYear(born)
        }}>
            <td>{name}</td>
            <td>{born}</td>
            <td>{bookCount}</td>
        </tr>
    }
    if (result.loading) {
        return <>loading...</>
    }
    return (
        <div>
            <h1>Authors</h1>
            <h3> click user to change year of birth</h3>
            <table >
                <thead>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        result.data && result.data.allAuthors.map((author, index) => {
                            return <Author key={index} author={author} />
                        })
                    }
                </tbody>
            </table>
            <EditAuthor author={selectAuthor} yearBorn={selectYear} />
        </div>
    )
}
