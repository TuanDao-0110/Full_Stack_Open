import React from 'react'
// import { jest } from '@jest/globals'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, jest, test } from '@jest/globals'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

beforeEach(() => {
  const data = {
    name: 'tuan',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1YW4iLCJpZCI6IjYzZmEyNTk2ZjU2MzA4Y2U1N2IzNTlhOSIsImlhdCI6MTY3ODEwOTA0NiwiZXhwIjoxNjc4MTEyNjQ2fQ.yTpT7BiMHqiM7m0dkq5c9LYHiRWKJ2zsrnkf7bZ56rE',
    username: 'tuan'
  }
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(data))
})
test('renders content', async () => {
  const blog = {
    title: 'test title',
    author: 'tuan',
    likes: 4,
    url: 'localhost',
    id: '1234'
  }
  const deleteBlog = jest.fn()

  render(<Blog blog={blog} deleteBlog={deleteBlog} />)
  const element = screen.getByText('test title')
  expect(element).toBeDefined()

  //   const { container } = render(<Blog blog={blog}></Blog>)
  //   const div = container.querySelector('.blog')
  //   expect(div).toHaveTextContent('test title')
})


test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'test title',
    author: 'tuan',
    likes: 4,
    url: 'localhost',
    id: '1234'
  }
  //1. set up event handler:
  const mockHanlder = jest.fn()
  render(<Blog blog={blog} deleteBlog={mockHanlder} />)
  // 2. set up session is started to interact with rendered component
  const user = userEvent.setup()
  // 3. find button view to render data from blog
  const buttonView = screen.getByText(/view/i)
  expect(buttonView).toBeDefined()
  await user.click(buttonView)
  // 4. find the button based on the text from the rendered component and click element
  const removeButton = screen.getByText(/Remove/i)
  expect(removeButton).toBeDefined()
  // 5. click the userEvent library:
  await user.click(removeButton)
  // 6. Expectation of the test verifies that the mock function has been called exactly once.
  expect(mockHanlder.mock.calls).toHaveLength(1)
})


test('step 1, Blog list tests, ', () => {
  const blog = {
    title: 'test title',
    author: 'tuan',
    likes: 4,
    url: 'localhost',
    id: '1234'
  }
  const deleteBlog = jest.fn()

  render(<Blog blog={blog} deleteBlog={deleteBlog} />)
  const title = screen.getByText('test title')
  const author = screen.getByText('tuan')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})


jest.mock('../services/blogs')

test('step 2 vs 3, checks that the blog URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {
  const blog = {
    title: 'test title',
    author: 'tuan',
    likes: 4,
    url: 'localhost',
    id: '1234'
  }
  // 1. set up the component
  const component = render(<Blog blog={blog} />)

  // 2. click the 'view' button to show the details
  const viewButton = screen.getByText(/view/i)
  expect(viewButton).toBeDefined()
  await userEvent.click(viewButton)

  // 3. verify the updated likes count after two clicks
  const likeButton = screen.getByText('like')
  expect(likeButton).toBeDefined()
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)
  // 4. add like function have blogservice inside so it will be call twice
  expect(blogService.update).toHaveBeenCalledTimes(2)
})

afterAll(() => {
  window.localStorage.removeItem('loggedBlogappUser')
})