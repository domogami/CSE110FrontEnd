import Handshake from './handshake';
import { useContext } from "react";
import { AuthContext } from "../../auth/Auth";

import { FBAuth, GoogleAuth, AppleAuth } from "../../components/app/base";
import API from '../../api/index';

import { FBIcon, GoogleIcon, AppleIcon, SiteLogo } from "../../images/logo";
import "./login.css";

const Login = ({ history }) => {
    
    const handleLogin = provider => {
        try {
            API.auth.signInWithPopup(provider).then(async() => {
                await API.init();
                history.push(API.me ? "/" : "register");
            });
        } catch (error){
            API.emit("error", error);
        }
    }

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        API.init().then(() => {
            history.push(API.me ? "/" : "register");
        });
    }

    return (
        <div className="parent">
            {/* <-------- Logo and Title --------> */}
            <div className="title">
                <img src={SiteLogo} className="logo" alt="PhilConnect Logo"/>
                <h1> Philanthropy Connect </h1>
            </div>
            <div className="loginContainer">
                <div className="loginInfo">
                    <h1>Log In</h1>
                    <div className="signInWith" >
                        {/* <-------- Google Login --------> */}
                        <button className="Login" onClick={() => handleLogin(GoogleAuth)}>
                            <img src={GoogleIcon} alt="Google Logo" />
                            <p> Continue with Google </p>
                        </button>
                        {/* <-------- Facebook Login --------> */}
                        <button className="Login" onClick={() => handleLogin(FBAuth)}>
                            <img src={FBIcon} alt="facebook Logo" />
                            <p> Continue with Facebook </p>
                        </button>
                        {/* <-------- Apple Login --------> */}
                        <button className="Login" onClick={() => handleLogin(AppleAuth)}>
                            <img src={AppleIcon} alt="Apple Logo" />
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