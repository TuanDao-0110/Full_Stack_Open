import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function MainLayout() {
    const location = useLocation()
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
                <button style={{ border: `${location.pathname === '/addbook' ? '1px solid red' : ''}` }}>
                    <Link style={{ textDecoration: 'none' }} to={'addbook'}>
                        add book
                    </Link>
                </button>
            </nav>
            <div style={{ paddingTop: '4rem' }}>
                <Outlet />
            </div>
        </div>
    )
}
