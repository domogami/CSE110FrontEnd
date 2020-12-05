import React, {Component} from "react";
import NavHeader from "../../components/nav";
import EventCard from "../../components/EventCard";
import { OrgProfile } from "../../images/placeholder"
import "./style.css";

class FindEvent extends Component {
    
    render(){
        const eventDoc = {
            title: "Habitat For Humanity",
            mission: "Fixing homelessness one family at a time",
            cause: ["Medical"],
            zip: "92122",
            contact: "info@sandiegohabitat.org",
            url: "www.sandiegohabitat.org",
            events: ["new event"]
        };
        
        return (
            <div className="findEventContainer">
                <div className="header">
                    <NavHeader />
                </div>
                <div className="EventView">
                    
                    <div className="featuredEventCard">
                        <img src={OrgProfile} alt="FeaturedImage"/>
                        <h1>Featured org</h1>
                        <p>Together with our supporters, we take on the big fights to stop cruelty before it happens. We’re working to end puppy mills, factory farms, trophy hunts, animal testing and other cruel industries so we can achieve the vision behind our name: a humane society. And we can’t do it without you. </p>
                    </div>
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