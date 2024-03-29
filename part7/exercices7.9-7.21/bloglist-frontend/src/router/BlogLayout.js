import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function BlogLayout() {
  const { user } = useSelector(state => state.userInfor)
  return user !== null ? (
    <div style={{paddingTop:'1rem'}}>
      <Outlet />
    </div>
  ) : <></>
}
