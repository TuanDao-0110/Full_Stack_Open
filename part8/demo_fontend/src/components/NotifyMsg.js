import React from 'react'

export default function NotifyMsg({ msg }) {
    if (!msg) {
        return null
    }
    return (
        <div style={{ color: 'red' }}>{msg}</div>
    )
}
