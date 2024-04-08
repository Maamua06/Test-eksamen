import { useState } from "react";
import { useBlogsContext } from '../hooks/useBlogContext';
import '../App.css';

const BlogForm = () => {
    const {dispatch} = useBlogsContext();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);

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
        }
        if (response.ok) {
            setTitle('');
            setAuthor('');
            setBody('');
            setError(null);
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
            className="Input"
            onChange={e => setTitle(e.target.value)}
            value={title}
        />

        <label className="Label">Author:</label>
        <input
            type="text"
            className="Input"
            onChange={e => setAuthor(e.target.value)}
            value={author}
        />

        <label className="Label">Body:</label>
        <input
            type="text"
            className="Input"
            onChange={e => setBody(e.target.value)}
            value={body}
        />

        <button className="Button">Add Blog</button>
        {error && <div className="Error">{error}</div>}
        </form>
     );
};
 
export default BlogForm;
