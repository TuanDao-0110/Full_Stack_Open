import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

export default function MainLayout({ token, setToken }) {
    const location = useLocation()
    const client = useApolloClient()
    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }
    return (
        <div style={{ paddingTop: '5rem', paddingLeft: '1rem' }}>
            <nav>
                <button style={{ border: `${location.pathname === '/authors' ? '1px solid red' : ''}` }}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={'authors'}>
                        author
                    </Link>
                </button>
                <button style={{ border: `${location.pathname === '/books' ? '1px solid red' : ''}` }}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={'books'}>
                        books
                    </Link>
                </button>
                {
                    token ?
                        <>
                            <button style={{ border: `${location.pathname === '/addbook' ? '1px solid red' : ''}` }}>
                                <Link style={{ textDecoration: 'none' }} to={'addbook'}>
                                    add book
                                </Link>
                            </button>
                            <Link style={{ textDecoration: 'none' }} to={'recommend'}>
                                <button style={{ border: `${location.pathname === '/recommend' ? '1px solid red' : ''}` }}>
                                    Recommend
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    logout()
                                }}
                            >
                                logout
                            </button>
                        </>
                        :
                        <>
                            <button style={{ border: `${location.pathname === '/login' ? '1px solid red' : ''}` }}>
                                <Link style={{ textDecoration: 'none' }} to={'login'}>
                                    login
                                </Link>
                            </button>

                        </>
                }
            </nav>
            <div style={{ paddingTop: '4rem' }}>
                <Outlet />
            </div>
        </div>
    )
}
