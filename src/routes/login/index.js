import React, {useContext} from "react";
import {AuthContext} from "../../auth/Auth";
import { Redirect } from "react-router-dom";
import db, {provider2} from "../common/base";
import logo from '../common/images/logo.svg';
import "./login.css"
import Handshake from './handshake'
import googleLogo from '../common/images/googleLogo.png'

const Login = ({history}) => {

    {/*
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
    */}

    const handleLoginWithGoogle = () => {
    try{
            db
                .auth()
                .signInWithPopup(provider2);
                history.push("/");
        } catch (error){
            alert(error);
        }
    }
    
    
    const { currentUser } = useContext(AuthContext);
      if (currentUser) {
        return <Redirect to="/" />;
      }
    return (
        <div className="parent">
            <div className="title">
            <img src={logo} className="logo" alt="PhilConnect Logo"/>
            <h1>
            Philanthropy Connect
            </h1>
            </div>

            <div className="loginContainer">
                <div className="loginInfo">
                    <h1>Log In</h1>
                    <button className="googleLogin" alt="Google Logo" onClick={handleLoginWithGoogle}>
                        <img src={googleLogo}/>
                        <p1> Continue with Google </p1>
                    </button>
                    {/* LOGIN HERE NOT IMPLEMENTED (NICE TO HAVE)
                        <form onSubmit={handleLogin} className="EmailAndPass">
                            <label className="fieldLabel">
                                <p>Email</p>
                                <input className="entryField" name="email" type="email" placeholder="ggillespie@eng.ucsd.edu" />
                            </label>
                            <label className="fieldLabel">
                                <p>Password</p>
                                <input className="entryField" name="password" type="password" placeholder="··········" />
                            </label>
                            <button className="loginButton" type="submit">Log In</button>
                            <button className="signinButton" onClick={redirectSignUp}>Sign Up</button>
                        </form>
                    */}
                    
                </div>
                <div className="handshake">
                <Handshake />
                </div>
            </div>
        </div>
    );
};
export default Login;