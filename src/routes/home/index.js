import { Component } from "react";

import API from "../../api";
import NavHeader from "../../components/nav";

import IndividualProfile   from "../../components/profile/display/individual";
import OrganizationProfile from "../../components/profile/display/organization";
import EventCard from "../../components/event/display";

import "./style.css";

/** @extends {Component<{ feed: OrgEventDocument[] }>} */
class Home extends Component {

    constructor(props) {
        props.feed = [];
        super(props);
        this.updateFeed();
    }

    updateFeed() {
        API.getFeed().then(f => {
            this.props.feed = f;
            this.forceUpdate();
        });
    }

    render(){
        return (
            <div className="HomePage">
                <NavHeader />
                <div className="homeView">
                    {API.isIndividual   && <IndividualProfile   doc={API.me} />}
                    {API.isOrganization && <OrganizationProfile doc={API.me} />}
                    <div className="card slideup" style={{ width: "70%" }}>
                        {API.isOrganization && <h4>My Feed</h4>}
                        {API.isIndividual   && <h4>Events Feed</h4>}
                        <div style={{ overflowY: "scroll", maxHeight: "calc(100% - 80px)" }}>
                        {(this.props.feed && this.props.feed.length) ? 
                            this.props.feed.map(event => <EventCard doc={event} editable={API.isOrganization} parent={this} />) :
                            (API.isIndividual && <p>Follow some orgs to see their events here!</p>) ||
                            (API.isOrganization && <p>Create some events to see them here!</p>) 
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;