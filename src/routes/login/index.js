import React, {useContext} from "react";
import {AuthContext} from "../../auth/Auth";
import { Redirect } from "react-router-dom";
import db, {provider, provider2, provider3} from "../common/base";
import logo from '../common/images/logo.svg';
import "./login.css"
import Handshake from './handshake'
import googleLogo from '../common/images/googleLogo.png'
import facebookLogo from '../common/images/facebookLogo.png'
import appleLogo from '../common/images/appleLogo.svg'

const Login = ({history}) => {
    
    /*const handleLogin = (event) => {
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
    }*/
    
    const handleLoginWithFb = ( ) => {
        try{
             db
                .auth()
                .signInWithPopup(provider);
                history.push("/");
        } catch (error){
            alert(error);
        }
    }

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
    const handleLoginWithApple = () => {
        try{
                db
                    .auth()
                    .signInWithPopup(provider3);
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
                <h1> Philanthropy Connect </h1>
            </div>
            <div className="loginContainer">
                <div className="loginInfo">
                    <h1>Log In</h1>
                    <div className="signInWith" >
                        <button className="Login" onClick={handleLoginWithGoogle}>
                            <img src={googleLogo} alt="Google Logo" />
                            <p1> Continue with Google </p1>
                        </button>
                        <button className="Login" onClick={handleLoginWithFb}>
                            <img src={facebookLogo} alt="facebook Logo" />
                            <p1> Continue with Facebook </p1>
                        </button>
                        <button className="Login" onClick={handleLoginWithApple}>
                            <img src={appleLogo} alt="Apple Logo" />
                            <p1> Continue with Apple </p1>
                        </button>
                    </div>
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
                <div className="aboutLogin">
                    <p1>Connect with organizations in need!</p1>
                    <div className="handshake">
                        <Handshake />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;