import React from "react";
import db from "../common/base"


const SignUp = ({history}) => {
    const redirectLogIn = () => {
        history.push("/")
    }
    const handleSignUp = (event) => {

        event.preventDefault();
        const { email, password } = event.target.elements;

        try{
            db
            .auth()
            .createUserWithEmailAndPassword(email.value,
                                            password.value);
            history.push("/");
        } catch(error){
            alert(error);
        }
      }
    return (
        <div className="centered">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={redirectLogIn}>Log In</button>
        </div>
    );
};
export default SignUp;