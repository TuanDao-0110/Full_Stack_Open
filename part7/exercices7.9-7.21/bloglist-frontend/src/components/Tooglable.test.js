import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable>', () => {
  let container;

  beforeEach(() => {
    // 1. set up container by using container query on render()
    container = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv'>toogglable content</div>
      </Togglable>,
    ).container;
  });
  // 2. check is children component render ?
  test('renders its children', async () => {
    await screen.findAllByText('toogglable content');
  });
  test('at start the childern are not displayed', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  // 3. click to show child's componnt
  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);
    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  // 4. click to hide child's componnt

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);
    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
