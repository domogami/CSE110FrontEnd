import { Component } from "react";

import API from "../../api";
import Header from "../../components/header";
import SelectType from "./select";
import IndividualProfile from "../../components/profile/edit/individual";
import OrganizationProfile from "../../components/profile/edit/organization";

export default class ProfileRegistration extends Component {

    constructor(props) {
        super(props);
        this.type = "";
        this.doc = {};

        this.childProps = {
            doc: this.doc,
            button: "Create",
            onSubmit: API.createProfile
        };
    }

    render() {
        let profile;
        if (this.type == "individual")   profile = <IndividualProfile title="Create Individual Profile" {...this.childProps} />;
        if (this.type == "organization") profile = <OrganizationProfile title="Create Organization Profile" {...this.childProps} />;

        return (
            <div className="parent">
                <Header />
                {this.type ? profile : <SelectType parent={this} />}
            </div>
        );
    }
};
