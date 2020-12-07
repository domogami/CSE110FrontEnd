import React, {Component} from "react";
import API from "../../api";
import NavHeader from "../../components/nav";
import OrganizationCard from "../../components/OrganizationCard";
import { OrgProfile } from "../../images/placeholder"
import "./style.css";

class FindOrg extends Component {

    constructor(props) {
        super(props);
        API.filter(API.me.skills, API.me.causes, 50, "organization").then(() => this.forceUpdate());
    }

    render(){

        return (
            <div className="findOrgContainer">
                <NavHeader parent={this} />
                <div className="OrgView fade-in">
                    
                    <div className="featuredOrgCard">
                        <img src={OrgProfile} alt="FeaturedImage"/>
                        <h1>Featured org</h1>
                        <p>Together with our supporters, we take on the big fights to stop cruelty before it happens. We’re working to end puppy mills, factory farms, trophy hunts, animal testing and other cruel industries so we can achieve the vision behind our name: a humane society. And we can’t do it without you. </p>
                    </div>
                    <div className="orgGrid">
                        {API.filtered.organization.map(doc => <OrganizationCard doc={doc}/>)}
                    </div>
                </div>
            </div>
        )
    }
};

export default FindOrg;