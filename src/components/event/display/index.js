import { Component } from 'react';
import Modal from 'react-modal';
// import eventImage from '../../images/placeholder/HumaneSociety.jpg'
import { PinIcon, XIcon, PlusIcon } from "../../../images/icons";

import "./style.css";

const customStyles = {
    content: {
        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        marginRight : '-50%',
        transform   : 'translate(-50%, -50%)'
    }
};

/**
 * @extends {Component<{ doc: OrgEventDocument }>}
 */
export class EventCard extends Component {

    constructor(props) {
        super(props);
        Modal.setAppElement(document.body);
        this.state = {
            isOpen: false,
            color: "#f7ece6",
            followed: false,
            logo: "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg",
        };
    }

    toggleEventProfile() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    updateFollow() {
        this.setState({ 
            followed: !this.state.followed,
        });
    }

    render() {
        // TODO: Check API whether user followed event and 
        //       create method located here to change "followed" state
        return (
            <div className="eventCards"
                style={this.state.color ? {backgroundColor: this.state.color} : {}}>
                <div onClick={() => this.setState({ isOpen: !this.state.isOpen})}>
                    <div className="eventTextContainer">
                        <img src={this.state.logo ? this.state.logo : PlusIcon } alt="blargh" className="eventIcon" />
                        <h5 className="eventTitle">{this.props.doc.title}
                            <h5 className="eventText">
                                Details: {this.props.doc.details}
                            </h5>
                        </h5>
                    </div>
                </div>
                
                <Modal 
                    isOpen={this.state.isOpen}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                    className="EventProfileModal"
                >
              
                    <button className="closeModal" onClick={() => this.setState({ isOpen: false })}><img src={XIcon}/></button>
                    
                    <div className="ModalProfileEvent">
                        <div className="ModalProfileEventLeft">
                            <img alt="EventImg"/>
                            <div className="rating">

                            </div>
                            <p>Test@example.com</p>
                            <div className="PinIcon">
                                <img src={PinIcon} />
                            </div>
                            <p>Causes:</p>
                            <p>Skills:</p>
                        </div>
                        <div className="ModalProfileEventRight">
                            <h1>Humane Society</h1>
                            <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default EventCard;