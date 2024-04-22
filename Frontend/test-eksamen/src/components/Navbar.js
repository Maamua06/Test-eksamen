import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const  { logout } = useLogout()
  const { user } = useAuthContext();
    return ( 
    <div>
        <nav class="navbar">
        <ul>
          <li><a href='#'>Logo</a></li>
          <li><Link to='/'>Bitter</Link> </li>
          {user && 
            <li> <a href='#' onClick={logout}>Logout</a></li>
          }
          {!user && 
          <>
            <li><Link to='/login'>Login</Link> </li>
            <li><Link to='signup'>Sign up</Link> </li>
          </>
          }
        </ul>
        </nav>
    </div>
     );
}
 
export default Navbar;