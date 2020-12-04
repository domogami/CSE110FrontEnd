import { useContext } from "react";
import { Redirect } from "react-router-dom";

import Handshake from './handshake';
import { AuthContext } from "../../auth/Auth";
import db, { FBAuth, GoogleAuth, AppleAuth } from "../common/base";
import API from '../../api/index';

import logo from '../common/images/logo.svg';
import googleLogo from '../common/images/googleLogo.png';
import facebookLogo from '../common/images/facebookLogo.png';
import appleLogo from '../common/images/appleLogo.svg';
import "./login.css";

const Login = ({ history }) => {
    
    const handleLogin = provider => {
        try {
            db.auth().signInWithPopup(provider);
            history.push("/");
        } catch (error){
            API.emit("error", error);
        }
    }

    // <----- If Logged In, go to Homepage ----->
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to={API.me ? "" : "/createProfileIndividual"} />;
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
                        <button className="Login" onClick={() => handleLogin(GoogleAuth)}>
                            <img src={googleLogo} alt="Google Logo" />
                            <p> Continue with Google </p>
                        </button>
                        {/* <-------- Facebook Login --------> */}
                        <button className="Login" onClick={() => handleLogin(FBAuth)}>
                            <img src={facebookLogo} alt="facebook Logo" />
                            <p> Continue with Facebook </p>
                        </button>
                        {/* <-------- Apple Login --------> */}
                        <button className="Login" onClick={() => handleLogin(AppleAuth)}>
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