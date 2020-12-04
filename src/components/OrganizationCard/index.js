// TODO 
import { Component } from 'react';
import addIcon from "./+.svg";
import followedIcon from "./Focus.svg";
import Modal from 'react-modal';
import "./orgCards.css"

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
 * @extends {Component<{ doc: OrganizationDocument }>}
 */
export class OrganizationCard extends Component {

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

    toggleOrgProfile() {
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
        // TODO: Check API whether user followed org and 
        //       create method located here to change "followed" state
        return (
            <div className="orgCards"
                style={this.state.color ? {backgroundColor: this.state.color} : {}}>
                <div onClick={() => this.setState({ isOpen: !this.state.isOpen})}>
                    <h5 className="orgTitle">{this.props.doc.title}</h5>
                    <div className="orgTextContainer">
                        <img src={this.state.logo ? this.state.logo : addIcon } alt="blargh" className="orgIcon" />
                        <h5 className="orgText">
                            Summary: {this.props.doc.mission}
                        </h5>
                    </div>
                </div>
                <img onClick={e => this.updateFollow(e)} src={this.state.followed ? followedIcon : addIcon} alt="Add org" className="followButton" />
                <Modal 
                    isOpen={this.state.isOpen}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={() => this.setState({ isOpen: false })}>Close Modal</button>
                </Modal>
            </div>
        );
    }
}

export default OrganizationCard;