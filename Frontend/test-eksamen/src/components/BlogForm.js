import { useState } from "react"
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const blog = {title, author, body}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(blog),
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
        className={emptyFields.includes('title') ? 'error' : 'input'}
      />

      <label>Author:</label>
      <input 
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes('body') ? 'error' : 'input'}
      />

      <label>body:</label>
      <input 
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
        className={emptyFields.includes('body') ? 'error' : 'input'}
      />

      <button>Add Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BlogForm
