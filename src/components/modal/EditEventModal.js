import { Component } from "react";
import Modal from "react-modal";
import { XIcon } from "../../images/icons";

import API from "../../api";
import EditEvents from "../event/edit";

import "./style.css";

/** @extends {Component<{ parent: import("../event/display").default }>} */
export default class EditEventModal extends Component {

    render() {
        return (
            <Modal 
                isOpen={this.props.parent.state.editOpen}
                className="profileModal"
            >    
                <button className="closeModal" onClick={() => this.props.parent.setState({ editOpen: false })}><img src={XIcon}/></button>
                <EditEvents
                    doc={Object.assign({}, this.props.parent.props.doc)}
                    title="Edit Event"
                    className="profileContainer"
                    button="Save"
                    onSubmit={API.updateEvent}
                    deleteFunc={API.deleteEvent}
                    doneFunc={() => {
                        this.props.parent.props.parent.updateFeed();
                        this.props.parent.setState({ editOpen: false });
                    }}
                    />
            </Modal>
        )
    }
}