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