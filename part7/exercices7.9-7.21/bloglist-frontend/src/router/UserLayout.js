import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    const { user } = useSelector(state => state.userInfor)
    
    
    return user !== null ? (
        <div>
            <Outlet />
        </div>
    ) : <></>
}
