import React from "react";
import logo from './images/PhilConLogo1.png';
import "./login.css"

const LoginPage = () => (
    <div>
        <img src={logo} className="logo" />
        <h1>
        Philanthropy Connect
        </h1>
        <form className="EmailAndPass">
            <label className="fieldLabel">
                <p1>Email</p1>
                <input className="entryField" name="email" type="email" placeholder="ggillespie@eng.ucsd.edu" />
            </label>
            <label className="fieldLabel">
                <p1>Password</p1>
                <input className="entryField" name="password" type="password" placeholder="··········" />
            </label>
            <a className="loginButton" type="submit">Log In</a>
        </form>
        <a>Sign Up</a>
    </div>
);

export default LoginPage;