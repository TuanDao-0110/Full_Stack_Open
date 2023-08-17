import { useEffect } from "react";
import User from "./router/User";
import Home from "./router/home";
import {
    Routes,
    Route,
} from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux";
import blogService from './services/blogs';
import { addUser, removeUser, } from "./reducer/userInfor";
import { setAllBlog } from "./reducer/blogReducer";
import UserDetails from "./router/UserDetails";
import UserLayout from "./router/UserLayout";
import BlogLayout from "./router/BlogLayout";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
const App = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userInfor)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(addUser(user))
            blogService.setToken(user.token);
            blogService.getAll().then((blogs) => dispatch(setAllBlog([...blogs])));
        }
    }, []);
    const showUser = () => {
        return user !== null ?
            <div style={{ display: 'flex', gap: '1rem', fontWeight: 'bold' }}>
                {user.username} logged in successfully
                <div>---</div>
                <div>
                    {
                        <button
                            onClick={() => {
                                localStorage.removeItem('loggedBlogappUser');
                                // setUser(null);
                                dispatch(removeUser())
                            }}
                        >
                            log out
                        </button>
                    }
                </div>
            </div> : <></>
    }
    return (
        <>
            <div style={{ background: '#D3D3D3', display: 'flex', gap: '0.5rem', padding: '0.5rem 0' }}>
                <a href="/">home</a>
                {'      '}
                <a href="/users">user</a>
                {'      '}
                <a href="/blogs">blog</a>
                {showUser()}
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="blogs" element={<BlogLayout />}>
                    <Route index element={<BlogList />} />
                    <Route path=":id" element={<BlogDetails />} />
                </Route>
                <Route path="users" element={<UserLayout />} >
                    <Route index element={<User />} />
                    <Route path=":id" element={<UserDetails />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
