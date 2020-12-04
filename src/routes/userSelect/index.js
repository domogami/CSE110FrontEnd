import React, {Component} from "react";
import { Redirect } from "react-router-dom";

import logo from '../common/images/logo.svg';
import "./style.css"

class UserSelect extends Component {

    render() {
        return (
            <div className="parent">                
                <div> 
                    <h3>What type of User Are you?</h3>
                </div>

                <div className="userOptions">
                    <h3>Find opportunities to help</h3>
                    <button className="userButton" type="button">Individual</button>

{/*TO DO: FInd a better phrase*/}

                    <h3>Share your events..</h3>
                    <button className="userButton" type="button">Organization</button>
                </div>
                
            </div>
        )
    }
};

export default UserSelect;