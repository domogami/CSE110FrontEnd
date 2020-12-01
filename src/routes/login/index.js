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
//import {OrganizationCard} from '../../components/OrganizationCard'

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
    // <----- If Logged In, go to Homepage ----->
    const { currentUser } = useContext(AuthContext);
      if (currentUser) {
        return <Redirect to="/createProfileIndividual" />;
      }
    return (
        <div className="parent">
            {/* <-------- Logo and Title --------> */}
            <div className="title">
                <img src={logo} className="logo" alt="PhilConnect Logo"/>
                <h1> Philanthropy Connect </h1>
            </div>
            <div className="loginContainer">
                <div className="loginInfo">
                    <h1>Log In</h1>
                    <div className="signInWith" >
                        {/* <-------- Google Login --------> */}
                        <button className="Login" onClick={handleLoginWithGoogle}>
                            <img src={googleLogo} alt="Google Logo" />
                            <p> Continue with Google </p>
                        </button>
                        {/* <-------- Facebook Login --------> */}
                        <button className="Login" onClick={handleLoginWithFb}>
                            <img src={facebookLogo} alt="facebook Logo" />
                            <p> Continue with Facebook </p>
                        </button>
                        {/* <-------- Apple Login --------> */}
                        <button className="Login" onClick={handleLoginWithApple}>
                            <img src={appleLogo} alt="Apple Logo" />
                            <p> Continue with Apple </p>
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
                    <p>Connect with organizations in need!</p>
                    <div className="handshake">
                        <Handshake />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;