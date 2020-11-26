import React, {Component} from "react";
//import db from "../common/base"
import logo from '../common/images/logo.svg';
import "./style.css"
import UIInterface2 from "./UIInterface2";

class createProfileIndividual extends Component {
    
    render() {
        return (
            <div className="parent">
                <div className="title">
                    <img src={logo} className="logo" alt="PhilConnect Logo"/>
                    <h1> Philanthropy Connect </h1>
                </div>
                <div className="createProfileContainer">
                    <div className="createProfileField">
                        <h1>Create Profile</h1>
                        <form className="profileInformation">
                            <label className="fieldLabel">
                                <p>First Name</p>
                                <input className="entryField" name="first" type="text" placeholder="Gary" />
                            </label>
                            <label className="fieldLabel">
                                <p>Last Name</p>
                                <input className="entryField" name="last" type="text" placeholder="Gillespie" />
                            </label>
                            <label className="fieldLabel">
                                <p>Email</p>
                                <input className="entryField" name="email" type="email" placeholder="ggillespie@eng.ucsd.edu" />
                            </label>
                            <button className="createIndiviudalButton" type="submit">Continue</button>
                            
                        </form>
                    </div>
                    <div className="createProfileInfo">
                        <p>Fill in some details to get started</p>
                        <div className="UIInterfaceImage">
                            <UIInterface2 />
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
};

export default createProfileIndividual;