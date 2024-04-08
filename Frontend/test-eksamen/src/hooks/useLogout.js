import { useAuthContext } from './useAuthContext';
import { useBlogsContext } from './useBlogsContext'; // Changed from useWorkoutsContext

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchBlogs } = useBlogsContext(); // Changed from useWorkoutsContext

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchBlogs({ type: 'SET_BLOGS', payload: null }); // Changed from SET_WORKOUTS to SET_BLOGS
  };

  return { logout };
};
