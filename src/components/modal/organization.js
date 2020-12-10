import { Component } from "react";
import Modal from "react-modal";

import "./style.css";

import { PinIcon, TagIcon, XIcon } from "../../images/icons";
import API from "../../api";

// import { Rating } from '@material-ui/lab';

import EventCards from "../event/display";

const DEFAULT_PIC = "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg";

/** @extends {Component<{ parent: import("../OrganizationCard").default, events: OrgEventDocument[] }>} */
export default class OrgModal extends Component {

    fetchEvents() {
        API.getOrgEvents(this.props.parent.props.doc.id).then(e => {
            this.props.events = e;
            this.forceUpdate();
        });
    }

    render() {
        const doc = this.props.parent.props.doc;
        return (
        <Modal 
            isOpen={this.props.parent.state.isOpen}
            contentLabel="Minimal Modal Example"
            className="profileModal fade-in"
            onAfterOpen={() => this.fetchEvents()}
        >
            <button className="closeModal" onClick={() => this.props.parent.setState({ isOpen: false })}><img src={XIcon}/></button>
            <div className="ModalProfile">
                <div style={{ width: "35%" }}>
                    <img className="ModalIcon" src={doc.picture || DEFAULT_PIC} alt="OrgImg"/>
                    <p>Contact: {doc.contact}</p>
                    <p>Website: {doc.url}</p>
                    <div className="PinIcon"><img src={PinIcon} />Zip: {doc.zip}</div>
                    <h5>Causes:</h5>
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
                            {doc.causes.length > 3 ? <p style={{ margin: "auto 0" }}>More ({doc.causes.length - 3})</p> : ""}
                        </div> : <span>Empty</span>
                    }
                </div>
                <div className="column-right">
                    <h3>{doc.title}</h3>
                    <p>Mission: {doc.mission}</p>
                    <h3>Events</h3>
                    <div style={{overflowY:"scroll"}}>{(this.props.events || []).map(e => <EventCards doc={e}/>)}</div>                    
                </div>
            </div>
        </Modal>);
    }
}

                