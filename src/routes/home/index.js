import { Component } from "react";
import Plot from 'react-plotly.js';

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
        this.state = { ready: false };
        this.props.stats = [];
        this.props.feed = [];
        
        API.getFeed().then(f => {
            this.props.feed = f;
            this.forceUpdate();
        });

        this.updateStats();
    }

    updateStats() {
        var data;
        var followerGroups = [0, 0, 0, 0, 0];
        var followerTexts = ["", "", "", "", ""];
        var layout = {
            title: 'Organization Follower Age Groups',
            font:{
                family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
                tickangle: -45
            },
            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap :0.05
        };
            
        API.getStats().then(orgFollowers => {
            followerGroups = Object.values(orgFollowers.age);
            for ( var i = 0; i < followerGroups.length; i++ ) {
                followerTexts[i] = followerGroups[i].toString() + " followers";
            }

            var trace1 = {
                x: ['10-13', '13-17', '18-30', '31-54', '55+'],
                y: followerGroups,
                type: 'bar',
                text: followerTexts,
                marker: {
                    color: 'rgb(142,124,195)'
                }
            };
            
            data = [trace1];
            this.props.stats = [data, layout]
            this.setState({ready: true});
            this.forceUpdate()
        });
    }

    render(){
        console.log(this.props.stats)
        return (
            <div className="HomePage">
                <NavHeader />
                <div className="homeView fade-in">
                    {API.isIndividual   && <IndividualProfile   doc={API.me} />}
                    {API.isOrganization && <OrganizationProfile doc={API.me} />}
                    <div>
                        {API.isOrganization && this.state.ready && <div className="newsFeed"><Plot data={this.props.stats[0]} layout={this.props.stats[1]}/></div>}
                        <div className="newsFeed">
                            <h1>Events Feed</h1>
                            {this.props.feed.length ? 
                                this.props.feed.map(event => <EventCard doc={event} />) :
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