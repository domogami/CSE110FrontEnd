import { Component } from "react";

import API from "../../api"
import NavHeader from "../../components/nav";
import NewsItem from "../../components/newsItem";

import IndividualProfile   from "../../components/profile/display/individual";
import OrganizationProfile from "../../components/profile/display/organization";

import "./style.css";

class Home extends Component {

    render(){
        return (
            <div className="HomePage">
                <div className="header">
                    <NavHeader />
                </div>
                <div className="homeView">
                    {API.isIndividual   && <IndividualProfile   doc={API.me} />}
                    {API.isOrganization && <OrganizationProfile doc={API.me} />}
                    <div className="newsFeed">
                        <h1>News Feed</h1>
                        <NewsItem />
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;
