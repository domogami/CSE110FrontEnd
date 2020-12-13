import { Component } from "react";
import NavHeader from "../../components/nav";
import EventCard from "../../components/event/display";

import API from "../../api";
import "./style.css";

class FindEvent extends Component {
    
    constructor(props) {
        super(props);
        API.filter(API.me.skills, API.me.causes, 100, "events").then(() => this.forceUpdate());
    }

    render(){
        return (
            <div className="findEventContainer">
                <NavHeader parent={this}/>
                <div className="EventView fade-in">
                    <div className="eventGrid">
                        {API.filtered.events.map(event => <EventCard doc={event} />)}
                    </div>
                </div>
            </div>
        )
    }
};

export default FindEvent;