import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(blogObject)
      .then(returnedBlog =>
        setBlogs(blogs.concat(returnedBlog))

      )
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>
          Title: <input id='title' value={title} onChange={handleTitleChange} />
      </div>
      <div>
          Author: <input id='author' value={author} onChange={handleAuthorChange} />
      </div>
          url: <input id='url' value={url} onChange={handleUrlChange}  />
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default BlogForm
