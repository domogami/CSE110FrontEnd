import React, {useContext} from "react";
import {AuthContext} from "../auth/Auth";
import { Redirect } from "react-router-dom";
import '../App.css'
import db from "../base";
import logo from '../images/PhilConLogo1.png';
import "../login.css"

const Login = ({history}) => {

    const handleLogin = (event) => {
        event.preventDefault()
        const {email, password } = event.target.elements;
        
        try{
            db.auth().signInWithEmailAndPassword(email.value,password.value);
            history.push("/");
        }
        catch (error) {
            alert(error)
        }
    
    }

    const redirectSignUp = () => {
        history.push("/signup")
    }
    const { currentUser } = useContext(AuthContext);
      if (currentUser) {
        return <Redirect to="/" />;
      }
    return (
        <div>
            <img src={logo} className="logo" />
            <h1>
            Philanthropy Connect
            </h1>
           
            <h1>Log In</h1>
            <form onSubmit={handleLogin} className="EmailAndPass">
                <label className="fieldLabel">
                    Email
                    <input className="entryField" name="email" type="email" placeholder="ggillespie@eng.ucsd.edu" />
                </label>
                <label className="fieldLabel">
                    Password
                    <input className="entryField" name="password" type="password" placeholder="··········" />
                </label>
                <button className="loginButton" type="submit">Log In</button>
            </form>
            <button className="signinButton" onClick={redirectSignUp}>Sign Up</button>
            
        </div>
    );
};
export default Login;