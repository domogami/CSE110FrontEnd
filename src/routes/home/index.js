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
        var orgDoc;
        if (API.isOrganization) orgDoc = API.me;

        var total = 0;
        var orgRating;
        if (API.isOrganization) {
            if(orgDoc.ratings.length == 0) {
                orgRating = "No Ratings";
            } else {
                for (var i = 0; i < orgDoc.ratings.length; i++) {
                    total += orgDoc.ratings[i].stars;
                }
                orgRating = total / orgDoc.ratings.length;
            }
        }

        var orgEvents;
        if (API.isOrganization) orgEvents = orgDoc.events.length;

        var followers10to13 = 0;
        var followers13to17 = 0;
        var followers18to30 = 0;
        var followers31to54 = 0;
        var followers55plus = 0;
        if (API.isOrganization) {
            for(var k = 0; k < orgDoc.followers.length; k++) {
                if (orgDoc.followers[k].age.equals("10-13")) followers10to13++;
                else if (orgDoc.followers[k].age.equals("13-17")) followers13to17++;
                else if (orgDoc.followers[k].age.equals("18-30")) followers18to30++;
                else if (orgDoc.followers[k].age.equals("31-54")) followers31to54++;
                else if (orgDoc.followers[k].age.equals("55+")) followers55plus++;
            }
        }

        //TODO Clean this part up for the organization and idk make a graph for the followers, data should be there

        return (
            <div className="HomePage">
                <div className="header">
                    <NavHeader />
                </div>

                <div className="homeView fade-in">
                    {API.isIndividual   && <IndividualProfile   doc={API.me} />}
                    {API.isOrganization && <OrganizationProfile doc={API.me} />}

                    {API.isOrganization &&
                        <div className="newsFeed">
                            <div className="organizationPhoto">
                                <img src={orgDoc.picture} alt="orgPic" />
                            </div>
                            <div className="organizationStats">
                                {API.isOrganization && <h1>{orgDoc.title} Statistics</h1> }

                                {API.isOrganization && <p>Followers: {orgDoc.followers.length}</p> }
                                {API.isOrganization && <p>example: Followers 13 to 17: {followers13to17}</p> }
                                {API.isOrganization && <p>Ratings: {orgRating}</p> }
                                {API.isOrganization && <p>Total Events: {orgEvents}</p> }

                                {API.feed.map(event => <NewsItem event={event} />)}
                            </div>
                        </div>
                    }

                    {API.isIndividual &&
                        <div className="newsFeed">
                        </div>
                    }



                </div>
            </div>
        )
    }
};

export default Home;
