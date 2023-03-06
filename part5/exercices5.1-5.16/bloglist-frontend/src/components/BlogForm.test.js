// import React from 'react'
// import '@testing-library/jest-dom/extend-expect'
// import { render, fireEvent } from '@testing-library/react'
// import BlogForm from './BlogForm'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
// const data = [
//   { author: 'test 1', url: 'localhost', title: 'testing title' },
//   { author: 'test 2', url: 'localhost', title: 'testing title 2' }
// ]
// const blogHandler = [
//   rest.get('http://locahost:3003/api/blogs', (req, res, ctx) => {
//     return res(ctx.json(data))
//   }),
//   rest.post('http://locahost:3003/api/blogs', (req, res, ctx) => {

//     return res(ctx.json(data.concat(req.bodyUsed)))
//   })
// ]
// const server = setupServer(...blogHandler)
// beforeAll(() => {
//   server.listen()
// })
// afterEach(() => { server.resetHandlers() })
// afterAll(() => { server.close() })
// describe('<BlogForm />', () => {
//   test('step 4 ,calls event handler with the right details when a new blog is created', () => {
//     // create a mock function for the addBlog prop
//     const addBlog = jest.fn()

//     // create mock state values for newBlog and user
//     const newBlog = {
//       title: 'Test Blog',
//       author: 'Test Author',
//       url: 'https://test-blog.com'
//     }

//     const user = {
//       username: 'testuser',
//       name: 'Test User'
//     }

//     // create a mock function for the setNewBlog hook
//     const setNewBlog = jest.fn()

//     // render the BlogForm component
//     const component = render(
//       <BlogForm
//         newBlog={newBlog}
//         addBlog={addBlog}
//         user={user}
//         setUser={() => { }}
//         setNewBlog={setNewBlog}
//       />
//     )
//     // get references to the input elements
//     const title = component.container.querySelector('#title')
//     const author = component.container.querySelector('#author')
//     const url = component.container.querySelector('#url')
//     const form = component.container.querySelector('form')

//     // set the input values and submit the form
//     fireEvent.change(title, { target: { value: 'New Test Blog' } })
//     fireEvent.change(author, { target: { value: 'New Test Author' } })
//     fireEvent.change(url, { target: { value: 'https://new-test-blog.com' } })
//     fireEvent.submit(form)

//     // check that the mock function was called with the expected arguments
//     expect(addBlog.mock.calls).toHaveLength(1)
//     expect(addBlog.mock.calls[0][0]).toEqual({
//       title: 'New Test Blog',
//       author: 'New Test Author',
//       url: 'https://new-test-blog.com'
//     })
//   })
// })


import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect, jest, test } from '@jest/globals'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'
jest.mock('../services/blogs')

describe('<BlogForm />', () => {
  test('step 4 ,submitting the form calls onSubmit', async () => {
    const createBlog = jest.fn()
    const setUser = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog} user={{ username: 'testing' }} setUser={setUser} />
    )
    const user = userEvent.setup()
    const submitBtn = component.container.querySelector('#submit')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    //1. check selector exist
    expect(submitBtn).toBeDefined()
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()

    // 1. set up typing input
    await user.type(title, 'Test Blog Title')
    await user.type(author, 'Test Author Name')
    await user.type(url, 'http://testblog.com')
    await user.click(submitBtn)


    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
      author: 'Test Author Name',
      title: 'Test Blog Title',
      url: 'http://testblog.com'
    })
  })
})
