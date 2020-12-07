import { Component } from "react";
import Modal from "react-modal";

import customStyles from "./styles";
import "./org.css";

import { PinIcon, TagIcon, XIcon } from "../../images/icons";

const DEFAULT_PIC = "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg";

/** @extends {Component<{ parent: import("../OrganizationCard").default }>} */
export default class OrgModal extends Component {

    render() {
        const doc = this.props.parent.props.doc;
        return (
        <Modal 
            isOpen={this.props.parent.state.isOpen}
            style={customStyles}
            contentLabel="Minimal Modal Example"
            className="OrgProfileModal fade-in"
        >      
            <button className="closeModal" onClick={() => this.props.parent.setState({ isOpen: false })}><img src={XIcon}/></button>
            <div className="ModalProfileOrg">
                <div style={{ width: "35%" }}>
                    <img className="ModalIcon" src={this.props.parent.props.doc.picture || DEFAULT_PIC} alt="OrgImg"/>
                    <div className="ratings">

                    </div>
                    <p>{doc.contact}</p>
                    <div className="PinIcon">
                        <img src={PinIcon} />
                    </div>
                    <h3>Causes:</h3>
                    {
                        doc.causes.length ? 
                        <div className="tagContainer">
                            {
                                doc.causes.slice(0, 3).map(c => (
                                <div className="tag">
                                    <img src={TagIcon} />
                                    <p>{c}</p>
                                </div>))
                            }
                            {
                                doc.causes.length > 3 ? <p>More ({doc.causes.length - 3})</p> : ""
                            }
                        </div> : <span>Empty</span>
                    }
                </div>
                <div className="column-1-2">
                    <h1>{doc.title}</h1>
                    <p>{doc.mission}</p>
                    {/* <h2>Upcoming Events</h2> */}
                </div>
            </div>
        </Modal>);
    }
}

                