import { Component } from "react";

import API from "../../api";
import Header from "../../components/header";
import SelectType from "./select";
import IndividualProfile from "../../components/profile/individual";
// import OrganizationProfile from "../../components/profile/organization";

import "./style.css"

export default class ProfileRegistration extends Component {

    constructor(props) {
        super(props);
        this.type = "";
        this.doc = {};
    }

    render() {
        let profile;
        if (this.type == "individual")   profile = <IndividualProfile doc={this.doc} title="Create Individual Profile" button="Create" doneFunc={API.createProfile} />;
        if (this.type == "organization") profile = <IndividualProfile doc={this.doc} />;
        return (
            <div className="parent">
                <Header />
                {this.type ? profile : <SelectType parent={this} />}
            </div>
        );
    }
};
