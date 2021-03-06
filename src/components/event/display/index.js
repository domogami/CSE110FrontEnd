import { Component } from 'react';
import EditEventModal from '../../modal/EditEventModal';
import EventModal from "../../modal/event";
import "./style.css";

const DEFAULT_PIC = "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg";

/** @extends {Component<{ doc: OrgEventDocument }>} */
export class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            editOpen: false,
            color: "white",
        };
    }

    render() {
        return (
            <div className="eventCards slideup"
                style={this.state.color ? { backgroundColor: this.state.color } : {}}>
                <div onClick={() => this.setState({ isOpen: !this.state.isOpen})}>
                    <div className={this.props.doc.org ? "eventTextContainer" : ""}>
                        {
                            this.props.doc.org && <div style={{ padding: "1rem" }}>
                                <img src={ this.props.doc.org.picture || DEFAULT_PIC } alt="eventIcon" className="eventIcon" />
                            </div>
                        }
                        <div className="eventCardText">
                            <h5 className="eventTitle">{this.props.doc.title}
                                <h5 className="eventText">{this.props.doc.details}</h5>
                            </h5>
                            {this.props.editable &&
                                <button className="button" style={{ position: "absolute", bottom: "15px", right: "15px" }} 
                                onClick={e => (e.stopPropagation(), this.setState({ editOpen: true }))}>Edit / Delete</button>} 
                        </div>
                    </div>
                </div>
                {this.props.editable && <EditEventModal parent={this} />}
                <EventModal parent={this} />
            </div>
        );
    }
}

export default EventCard;