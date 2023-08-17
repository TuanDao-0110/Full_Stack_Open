import React from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'


export default function User() {
    const { user } = useSelector(state => state.userInfor)
    const { blogs } = useSelector(state => state.blogReducer)

    const navigate = useNavigate()

    const showBlogs = () => {
        const userCount = {};
        blogs.forEach(item => {
            const userName = item.user.name;
            userCount[userName] = (userCount[userName] || 0) + 1;
        });
        const userCountArray = Object.entries(userCount).map(([name, count]) => ({
            name,
            count
        }));
        return <table>
            <thead>
                <tr>
                    <th>
                        Users
                    </th>
                    <th>
                        Blog created
                    </th>
                </tr>
            </thead>
            <tbody>
                {userCountArray.map((user, index) => {
                    return <tr key={index} style={{ cursor: 'pointer' }} onClick={() => {
                        moveUserDetails(user.name)
                    }}>
                        <td style={{ textAlign: 'center' }} >{user.name}</td>
                        <td style={{ textAlign: 'center' }}>{user.count}</td>
                    </tr>
                })}
            </tbody>

        </table>
    }
    const moveUserDetails = (name) => {
        let id = ''
        blogs.forEach(blog => {
            if (blog.user.username === name) {
                id = blog.user.id
            }
        })
        navigate(id, { state: { name } })
    }
    return user !== null ? (
        <div>
            <h2>User</h2>
            {showBlogs()}
        </div>
    ) : <></>
}
