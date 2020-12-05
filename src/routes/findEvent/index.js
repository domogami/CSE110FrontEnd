import React, {Component} from "react";
import NavHeader from "../../components/nav";
import EventCard from "../../components/EventCard";
import { OrgProfile } from "../../images/placeholder"
import "./style.css";

class FindEvent extends Component {
    
    render(){
        const eventDoc = {
            title:    "Elderly Care and Health",
            details:  "Is it unclear how you can contribute to caretaking? Join us for a session for how you can effectively volunteer for the elderly!",
            zip:      67825,
            skills:   ["Caretaking", "Multimedia"],
            date:     1632121200,
        };
        
        return (
            <div className="findEventContainer">
                <div className="header">
                    <NavHeader />
                </div>
                <div className="EventView fade-in">
                    <div className="eventGrid">
                        <EventCard doc={eventDoc}/>
                        <EventCard doc={eventDoc}/>
                        <EventCard doc={eventDoc}/>
                        <EventCard doc={eventDoc}/>
                        <EventCard doc={eventDoc}/>
                        <EventCard doc={eventDoc}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default FindEvent;