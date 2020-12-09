import { Component } from "react";
import Modal from "react-modal";
import "./style.css";
import { XIcon } from "../../images/icons";
// import API from "../../api";
// import EditEvents from "../event/edit";

class EditEventModal extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Modal 
                isOpen={this.props.parent.state.editOpen}
                className="profileModal"
            >    
                <button className="closeModal" onClick={() => this.props.parent.setState({ editOpen: false })}><img src={XIcon}/></button>
                <div className = "">
                    {/* <EditEvents
                        doc={ this.props.parent.state.doc }
                        title={ "blah" }
                        className="profileContainer"
                        redirect="post" 
                        button="Create" 
                        doneFunc={ API.updateEvent }
                     /> */}
                </div>
            </Modal>
        )
    }
}

export default EditEventModal;