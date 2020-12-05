import { Component } from "react";

import API from "../../api"
import NavHeader from "../../components/nav";
import NewsItem from "../../components/newsItem";

import IndividualProfile   from "../../components/profile/display/individual";
import OrganizationProfile from "../../components/profile/display/organization";

import "./style.css";

class Home extends Component {

    constructor(props) {
        super(props);
        this.props.feed = [];
        API.getFeed().then(f => {
            console.log(f);
            this.forceUpdate();
        });
    }

    render(){
        return (
            <div className="HomePage">
                <div className="header">
                    <NavHeader />
                </div>
                <div className="homeView fade-in">
                    {API.isIndividual   && <IndividualProfile   doc={API.me} />}
                    {API.isOrganization && <OrganizationProfile doc={API.me} />}
                    <div className="newsFeed">
                        <h1>News Feed</h1>
                        {API.feed.map(event => <NewsItem event={event} />)}
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;
