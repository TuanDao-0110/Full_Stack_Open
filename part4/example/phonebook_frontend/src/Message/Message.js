import React, { } from 'react'
function Message({ systermMessage }) {
    const { display, message, type } = systermMessage
    const success = {
        color: 'green',
        fontStyle: 'italic',
        display: 'flex',
        justifyContent: 'center',
        fontSize: 32,
        width: '100vw',
        backgroundColor: '#D3D3D3',
        border: '10px solid green',
        marginBottom :'10px'
    }
    const error = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 32,
        width: '100vw',
        backgroundColor: '#D3D3D3',
        border: '10px solid red',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    }


    return (
        display ?
            <div style={type === 'error' ? error : success}>
                <br />
                <em>{message}</em>
            </div> : ''
    )
}

export default Message