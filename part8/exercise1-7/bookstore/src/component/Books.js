import React from 'react'
import { GET_ALL_BOOKS } from '../query'
import { useQuery } from '@apollo/client'

export default function Books() {
    const result = useQuery(GET_ALL_BOOKS)
    const Book = ({ book }) => {
        const { author,
            published,
            title } = book
        return <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td>{published}</td>
        </tr>
    }
    if (result.loading) return <>loading...</>
    return (
        <div>
            <h1>Books</h1>
            <table >
                <thead>

                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        result.data && result.data.allBooks.map((book, index) => {
                            return <Book key={index} book={book} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
