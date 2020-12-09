import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import EditEventModal from '../../modal/EditEventModal';
import EventModal from "../../modal/event";
import "./style.css";

const customStyles = {
    content: {
        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        transform   : 'translate(-50%, -50%)'
    }
};

const DEFAULT_PIC = "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg";

/**
 * @extends {Component<{ doc: OrgEventDocument }>}
 */
export class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            // editOpen: false,
            color: "white",
        };
    }

    toggleEventProfile() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        // TODO: Check API whether user followed event and 
        //       create method located here to change "followed" state
        return (
            <div className="eventCards"
                style={this.state.color ? { backgroundColor: this.state.color } : {}}>
                <div onClick={() => this.setState({ isOpen: !this.state.isOpen})}>
                    <div className="eventTextContainer">
                        <img src={ this.props.doc.picture || DEFAULT_PIC } alt="eventIcon" className="eventIcon" />
                        <div className="eventCardText">
                            <h5 className="eventTitle">{this.props.doc.title}
                                <h5 className="eventText">{this.props.doc.details}</h5>
                            </h5>
                        </div>
                        
                        {/* <EditEventModal isOpen={ this.state.editOpen } doc={this.props.doc} /> */}
                    </div>
                </div>   
                {/* <div onClick={() => {window.location = "/post"}}>
                    <h1>Edit</h1>
                </div>        */}
                {/* <div onClick={() => this.setState({ editOpen: !this.state.editOpen})}>
                    <h1>Edit</h1>
                </div>  */}
                {/* <EditEventModal parent={this} /> */}
                <EventModal parent={this} />
            </div>
        );
    }
}

export default EventCard;