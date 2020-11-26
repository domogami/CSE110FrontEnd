import React, {Component} from "react";
import OrganizationCard from "../../components/OrganizationCard";
import db from "../common/base"
import "./style.css"


class Home extends Component {

    render(){
        return (
            <div>
                <h1>Home</h1>
                <div className="sidebar">
                    {/* TODO */}
                </div>
                <div className="orgGrid">
                    <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard />
                    <OrganizationCard />
                </div>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </div>
        )
    }
};

export default Home;
