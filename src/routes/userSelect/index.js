import React, {Component} from "react";
import { Redirect, Route, Router } from "react-router-dom";
import logo from '../common/images/logo.svg';
import "./style.css"

class UserSelect extends Component {

/*TO DO: FInd a better phrase*/

render() {
    return (
        <div className="parent">                
        
            <div className="title">
                <img src={logo} className="logo" alt="PhilConnect Logo"/>
                <h1> Philanthropy Connect </h1>
            </div>
            
            <div className="pgTitle"> 
                <h3>What Type of User Are you?</h3>
            </div>

            <div className="userOptions">

                <div className="userType">
                    <h3>Find opportunities to help:</h3>
                    <button className="userButton" 
                            type="button" 
                            onClick={e => this.props.history.push("/createProfileIndividual")}>
                                Individual
                    </button>
                </div>

                <div></div>

                <div className="userType">
                    <h3>Share your events with others:</h3>
                    <button className="userButton" 
                            type="button"
                            onClick={e => this.props.history.push("/createProfileOrg")}>
                                Organization
                    </button>   
                </div>
                 
            </div>
        </div>
        )
    }
};

export default UserSelect;