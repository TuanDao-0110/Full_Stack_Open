import React from 'react'


export default function Books({ result, activeGenre, setActiveGenre }) {
    const Book = ({ book }) => {
        const { author,
            published,
            title, genres } = book
        return <tr >
            <td style={{ border: '1px solid black' }}>{title}</td>
            <td style={{ border: '1px solid black', alignItems: 'center' }}>{author.name}</td>
            <td style={{ border: '1px solid black', alignItems: 'center' }}>{published}</td>
            <td style={{ border: '1px solid black', alignItems: 'center' }}>{genres[0]}</td>
        </tr>
    }
    const GenresType = (books) => {
        const allGenres = []
        for (let i of books) {
            if (!allGenres.includes(i.genres[0])) {
                allGenres.push(i.genres[0])
            }
        }
        return allGenres.map((genre, index) => {
            return <button key={index} onClick={() => {
                setActiveGenre(genre)
            }}>{genre}</button>
        })
    }
    if (result.loading) return <>loading...</>
    return (
        <div
            style={{ justifyContent: 'center', paddingBottom: '5rem' }}
        >
            <h1>Books</h1>
            <h3 style={{
            }}>in genre ---
                <span style={{
                    fontWeight: 'bold',
                    fontSize: '30px'
                }}>
                    {activeGenre}
                </span>
            </h3>
            <table >
                <thead>
                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Published</th>
                        <th>genres</th>
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
            <div>
                <button onClick={() => {
                    setActiveGenre('')
                }}>all</button>
                {
                    result.data && GenresType(result.data.allBooks)
                }
            </div>
        </div>
    )
}
