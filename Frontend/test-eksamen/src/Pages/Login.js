import React from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";

const Login = () => {
    return ( 
    <div>
            <Navbar />
            <div class="container">        
        <h2>Login</h2>
        <form action="">
            <input type="text" name="username" placeholder="Brukernavn" required />
            <input type="password" name="password" placeholder="Passord" required />
            <input type="submit" value="Logg inn" />
            </form>
        </div>
     
    </div>
   );     
}
 
export default Login;