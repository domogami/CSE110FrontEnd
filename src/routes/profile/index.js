import { Component } from "react";

import API from "../../api";
import NavHeader from "../../components/nav/index";
import IndividualProfile from "../../components/profile/edit/individual";
import OrganizationProfile from "../../components/profile/edit/organization";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.childProps = {
            doc: Object.assign({}, API.me),
            button: "Save",
            onSubmit: API.updateProfile
        }
    }

    render() {
        return (
            <div className = "parent">
                <NavHeader/>
                <div className="fade-in">
                    {API.isIndividual &&<IndividualProfile title="My Profile" {...this.childProps} />}
                    {API.isOrganization && <OrganizationProfile title="Organization Profile" {...this.childProps} />}
                </div>
            </div>
        )
    }
};

export default Profile;