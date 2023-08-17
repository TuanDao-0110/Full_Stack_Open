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
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


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
                        <Button
                            variant="dark"
                            onClick={() => {
                                localStorage.removeItem('loggedBlogappUser');
                                // setUser(null);
                                dispatch(removeUser())
                            }}
                        >
                            log out
                        </Button>
                    }
                </div>
            </div> : <></>
    }
    return (
        <div className="container" style={{ textTransform: 'capitalize' }}>
            <Navbar bg="primary" data-bs-theme="dark" >
                <Container>
                    <Nav className="me-auto" >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">user</Nav.Link>
                        <Nav.Link href="/blogs">blog</Nav.Link>
                        <Nav.Link >
                            {showUser()}
                        </Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
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
        </div>
    );
};

export default App;
