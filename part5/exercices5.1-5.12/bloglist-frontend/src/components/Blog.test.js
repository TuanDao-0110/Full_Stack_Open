import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'



test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'tuan',
    likes: 4,
    url: 'localhost',
    id: '1234'
  }

  //   render(<Blog blog={blog} />)
  //   const element = screen.getByText('test title')
  //   expect(element).toBeDefined()
  const { container } = render(<Blog blog={blog}></Blog>)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('test title')
})