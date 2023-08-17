import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

export default function UserDetails() {
    let { id } = useParams()
    let { state } = useLocation()
    const { blogs } = useSelector(state => state.blogReducer)
    const renderBlogs = (id) => {
        let count = 0
        return blogs.map((item, index) => {
            if (item.user.id === id) {
                count += 1
                return <p key={index} style={{}}>
                    {count} ---                  {item.title}
                </p>
            }
        })
    }
    if (id === null) {
        return <></>
    }
    return (
        <div>
            <h2 style={{ textTransform: "capitalize" }}>
                {state.name}
            </h2>
            <h4>added blogs</h4>
            {renderBlogs(id)}
        </div>
    )
}
