import React, {Component} from "react";
import OrganizationCard from "../../components/OrganizationCard";
import db from "../common/base"
import "./style.css"


class Home extends Component {

    render(){
        const orgDoc = {
            title: "Habitat For Humanity",
            mission: "Fixing homelessness one family at a time",
            cause: ["Medical"],
            zip: "92122",
            contact: "info@sandiegohabitat.org",
            url: "www.sandiegohabitat.org",
            events: ["new event"]
        };

        return (
            <div>
                <h1>Home</h1>
                <div className="sidebar">
                    {/* TODO */}
                </div>
                <div className="orgGrid">
                    <OrganizationCard doc={orgDoc}/>
                    {/* <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard /> */}
                </div>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </div>
        )
    }
};

export default Home;
