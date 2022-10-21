// 5.13: Blog list tests, step1
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test(
  'renders the blog`s title and author, but does not url or number of likes by default',
  () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com/',
      likes: 99
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Test Blog')
    expect(div).toHaveTextContent('Test Author')
    expect(div).not.toHaveTextContent('https://test.com/')
    expect(div).not.toHaveTextContent(99)
  }
)

test('url and number of likes are shown when the button controlling the shown details has been clicked',
  async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com/',
      likes: 99,
      user: {
        name: 'Test'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('https://test.com/')
    expect(div).toHaveTextContent('99')
  }
)