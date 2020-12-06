import React, {Component} from "react";
import NavHeader from "../../components/nav";
import EventCard from "../../components/EventCard";
import { OrgProfile } from "../../images/placeholder"
import "./style.css";
import API from "../../api";

class FindEvent extends Component {
    
    render(){
        
        return (
            <div className="findEventContainer">
                <div className="header">
                    <NavHeader parent={this}/>
                </div>
                <div className="EventView fade-in">
                    {/* <div className="featuredEventCard">
                        <img src={OrgProfile} alt="FeaturedImage"/>
                        <h1>Featured Event Here!</h1>
                        <p1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p1>
                    </div> */}
                    <div className="eventGrid">
                        {
                            API.filtered.events.map(event => <EventCard doc={event} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
};

export default FindEvent;