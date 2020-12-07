import { Component } from "react";

import API from "../../api"
import NavHeader from "../../components/nav";

import IndividualProfile   from "../../components/profile/display/individual";
import OrganizationProfile from "../../components/profile/display/organization";
import EventCard from "../../components/event/display";

import "./style.css";

/** @extends {Component<{ feed: OrgEventDocument[] }>} */
class Home extends Component {

    constructor(props) {
        super(props);
        this.props.feed = [];
        
        API.getFeed().then(f => {
            this.props.feed = f;
            this.forceUpdate();
        });
    }

    render(){
        return (
            <div className="HomePage">
                <NavHeader />
                <div className="homeView fade-in">
                    {API.isIndividual   && <IndividualProfile   doc={API.me} />}
                    {API.isOrganization && <OrganizationProfile doc={API.me} />}
                    <div className="newsFeed">
                        <h1>News Feed</h1>
                        {this.props.feed.map(event => <EventCard doc={event} />)}
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;
