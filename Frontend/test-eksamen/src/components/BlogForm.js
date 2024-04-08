import { useState } from "react";
import { useBlogsContext } from '../hooks/useBlogContext';
import '../App.css';

const BlogForm = () => {
    const {dispatch} = useBlogsContext();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blog = {title, author, body};

        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('');
            setAuthor('');
            setBody('');
            setError(null);
            setEmptyFields([]);
            console.log('new blog added', json);
            dispatch({type: 'CREATE_BLOG', payload: json})
        }
    };

    return ( 
        <form className="FormBox" onSubmit={handleSubmit}>
        <h3 className="FormTitle">Add a new blog</h3>

        <label className="Label">Blog Title:</label>
        <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : 'input'}
        />

        <label className="Label">Author:</label>
        <input
            type="text"
            onChange={e => setAuthor(e.target.value)}
            value={author}
            className={emptyFields.includes('author') ? 'error' : 'input'}
        />

        <label className="Label">Body:</label>
        <input
            type="text"
            onChange={e => setBody(e.target.value)}
            value={body}
            className={emptyFields.includes('body') ? 'error' : 'input'}
        />

        <button className="Button">Add Blog</button>
        {error && <div className="Error">{error}</div>}
        </form>
     );
};
 
export default BlogForm;
