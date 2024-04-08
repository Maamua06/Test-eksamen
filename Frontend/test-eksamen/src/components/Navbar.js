import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
    <div>
        <nav class="navbar">
        <ul>
          <li><a href='#'>Logo</a></li>
          <li><Link to='/'>Bitter</Link> </li>
          <li><Link to='/login'>Login</Link> </li>
        </ul>
        </nav>
    </div>
     );
}
 
export default Navbar;