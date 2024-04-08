import { useEffect } from 'react';
import { useBlogsContext } from "../hooks/useBlogsContext"; // Changed from useWorkoutsContext
import { useAuthContext } from "../hooks/useAuthContext";

// components
import BlogDetails from '../components/BlogDetails'; // Changed from WorkoutDetails
import BlogForm from '../components/BlogForm'; // Changed from WorkoutForm
import Navbar from '../components/Navbar';

const Home = () => {
  const { blogs, dispatch } = useBlogsContext(); // Changed from useWorkoutsContext
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs/', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_BLOGS', payload: json}); // Changed from SET_WORKOUTS to SET_BLOGS
      }
    };

    if (user) {
      fetchBlogs();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="blogs">
        {blogs && blogs.map((blog) => (
          <BlogDetails key={blog._id} blog={blog} /> 
        ))}
      </div>
      <BlogForm /> 
    </div>
  );
};

export default Home;
