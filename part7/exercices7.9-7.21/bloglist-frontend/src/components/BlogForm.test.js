import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BlogForm from './BlogForm';
import { expect, jest, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';

describe('<BlogForm />', () => {
  test('step 4 ,submitting the form calls onSubmit', async () => {
    const createBlog = jest.fn();
    const setUser = jest.fn();
    const component = render(
      <BlogForm createBlog={createBlog} user={{ username: 'testing' }} setUser={setUser} />,
    );
    const user = userEvent.setup();
    const submitBtn = component.container.querySelector('#submit');
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    //1. check selector exist
    expect(submitBtn).toBeDefined();
    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();

    // 2. set up typing input
    await user.type(title, 'Test Blog Title');
    await user.type(author, 'Test Author Name');
    await user.type(url, 'http://testblog.com');
    await user.click(submitBtn);

    // 3. testing createBlog is called with data same as input's values
    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      author: 'Test Author Name',
      title: 'Test Blog Title',
      url: 'http://testblog.com',
    });
  });
});
