import Handshake from './handshake';
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/Auth";

import { FBAuth, GoogleAuth, AppleAuth } from "../../components/app/base";
import API from '../../api/index';

import { FBIcon, GoogleIcon, AppleIcon, SiteLogo } from "../../images/logo";
import "./login.css";

const Login = ({ history, location }) => {
    
    const redirect = new URLSearchParams(location.search).get("redirect");

    const handleLogin = provider => {
        try {
            API.auth.signInWithPopup(provider).then(async() => {
                await API.init();
                history.push(redirect || "/register");
            });
        } catch (error){
            API.emit("error", error);
        }
    }

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        API.init().then(() => {
            // console.log(`Redirecting to ${redirect} in Login`);
            history.push(API.me ? (redirect || "/") : "/register");
        });
    }
    const [visible, setVisible] = useState(!redirect);
    if (!visible) setTimeout(() => setVisible(true), 500);

    return (
        <div className="parent">
            {/* <-------- Logo and Title --------> */}
            <div className="title">
                <img src={SiteLogo} className="logo" alt="PhilConnect Logo"/>
                <h1> Philanthropy Connect </h1>
            </div>
            {visible &&
            <div className="loginContainer fade-in">
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
                        {/* <button className="Login" onClick={() => handleLogin(AppleAuth)}>
                            <img src={AppleIcon} alt="Apple Logo" />
                            <p> Continue with Apple </p>
                        </button> */}
                    </div>
                </div>
                <div className="aboutLogin">
                    <p>Connect with organizations in need!</p>
                    <div className="handshake">
                        <Handshake />
                    </div>
                </div>
            </div>
            }
        </div>
    );
};
export default Login;