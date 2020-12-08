import { Component } from "react";
import Modal from "react-modal";

import customStyles from "./styles";
import "./style.css";

import { PinIcon, TagIcon, XIcon } from "../../images/icons";

const DEFAULT_PIC = "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg";

/** @extends {Component<{ parent: import("../../components/event/display").default }>} */
export default class EventModal extends Component {

    render() {
        const doc = this.props.parent.props.doc;
        const date = new Date(doc.date);
        var output = date.toLocaleString('default', { month: 'long' }) + 
            " " + date.getDate() + ", " + 
            date.getFullYear() + " at " + 
            date.toTimeString();

        return (
        <Modal 
            isOpen={this.props.parent.state.isOpen}
            style={customStyles}
            contentLabel="Minimal Modal Example"
            className="profileModal fade-in"
        >      
            <button className="closeModal" onClick={() => this.props.parent.setState({ isOpen: false })}><img src={XIcon}/></button>
            <div className="ModalProfileOrg">
                <div style={{ width: "35%" }}>
                    <img className="ModalIcon" src={this.props.parent.props.doc.picture || DEFAULT_PIC} alt="OrgImg"/>
                    
                    <p>Zip: {doc.zip}</p>
                    
                    <div className="PinIcon">
                        <img src={PinIcon} />
                    </div>
                    <h3>Skills:</h3>
                    {
                        doc.skills.length ? 
                        <div className="tagContainer">
                            {
                                doc.skills.slice(0, 3).map(c => (
                                <div className="tag">
                                    <img src={TagIcon} />
                                    <p>{c}</p>
                                </div>))
                            }
                            {
                                doc.skills.length > 3 ? <p>More ({doc.skills.length - 3})</p> : ""
                            }
                        </div> : <span>Empty</span>
                    }
                </div>
                <div className="column-right">
                    <h1>{doc.title}</h1>
                <p>Date: {output}</p>
                    <p>Details: {doc.details}</p>
    
                    {/* <h2> CHANGE FORMAT + Upcoming Events</h2> */}
                </div>
            </div>
        </Modal>);
    }
}

                