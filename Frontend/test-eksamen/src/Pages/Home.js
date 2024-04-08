import '../App.css';


// Imports
import Navbar from '../components/Navbar';
import BlogDetails from '../components/BlogDetails';
import BlogForm from '../components/BlogForm';
import { useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogContext';





const Home = () => {
  const { blogs, dispatch} = useBlogsContext()

  useEffect( () => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs/')
      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_BLOGS', payload: json})
      }
    }

    fetchBlogs();
  }, [dispatch])

  return (
    <div className="App">
      <Navbar />
      <div>
        {blogs && blogs.map((blog) => (
          <BlogDetails key={blog._id} blog={blog} />
        ))}
      </div>
      <BlogForm />
        
    </div>
  );
}

export default Home;