import { Component } from "react";

import API from "../../api";
import NavHeader from "../../components/nav/index";
import IndividualProfile from "../../components/profile/individual";

import "./index.css";

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className = "parent">
                <div className="header">
                    <NavHeader/>
                </div>
                <div className="viewProfileContainer">
                    {  
                        API.isInvidual &&<IndividualProfile doc={Object.assign({}, API.me)} title="My Profile" button="Save" doneFunc={API.updateProfile} />
                    }
                    {
                        API.isOrganization && <IndividualProfile doc={API.me} />
                    }
                </div>
            </div>
        )
    }
};

export default Profile;