import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    const { user } = useSelector(state => state.userInfor)
    
    
    return user !== null ? (
        <div>
            <h1>Blogs</h1>
            {/* {showUser()} */}
            <Outlet />
        </div>
    ) : <></>
}
