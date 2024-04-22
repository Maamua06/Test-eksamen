import { useEffect, useState } from "react"
import { useBlogsContext } from "../hooks/useBlogsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const BlogForm = () => {
  const { dispatch } = useBlogsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  function Reload() {
    const [submit, setSubmit] = useState(false)


    const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (!user) {
        setError('You must be logged in')
        return
      } 
  
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        body: JSON.stringify({title, author, body}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
        setTitle('')
        setAuthor('')
        setBody('')
        setError(null)
        setEmptyFields([])
        dispatch({type: 'CREATE_BLOG', payload: json})

        setSubmit(true);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    } 

    const response = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      body: JSON.stringify({title, author, body}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setAuthor('')
      setBody('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_BLOG', payload: json})

    }
  }

  return (
    <form className="FormBox" onSubmit={handleSubmit}>
      <h3>Add a New Blog</h3>

      <label>Blog Title:</label>
      
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields === 'title' ? 'error' : 'input'}
      />

      <label>Author:</label>
      <input 
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields === 'author' ? 'error' : 'input'}
      />

      <label>body:</label>
      <input 
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
        className={emptyFields === 'body' ? 'error' : 'input'}
      />

      <button>Add Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BlogForm
