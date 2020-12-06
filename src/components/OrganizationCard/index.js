// TODO 
import { Component } from 'react';
import addIcon from "./+.svg";
import followedIcon from "./Focus.svg";
import Modal from 'react-modal';
import "./orgCards.css"
import NewsItem from '../newsItem';
import orgImage from '../../images/placeholder/HumaneSociety.jpg'
import { PinIcon, TagIcon, XIcon } from "../../images/icons";
import API from '../../api';

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
            loading: false,
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
        if (this.state.loading) return;
        this.setState({ loading: true });
        API.follow(this.props.doc.id, !this.state.followed).then((result) => {
            this.setState({ followed: result, loading: false });
            API.getProfile();
            this.forceUpdate();
        });
    }

    render() {
        // TODO: Check API whether user followed org and 
        //       create method located here to change "followed" state
        const doc = this.props.doc;
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
                <img onClick={e => this.updateFollow(e)} 
                    style={{ cursor: "pointer", opacity: this.state.loading ? 0.5 : 1, width: "15%" }}
                    src={this.state.followed ? followedIcon : addIcon} 
                    alt="Add org" className="followButton" />
                <Modal 
                    isOpen={this.state.isOpen}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                    className="OrgProfileModal"
                >
              
                    <button className="closeModal" onClick={() => this.setState({ isOpen: false })}><img src={XIcon}/></button>
                    
                    <div className="ModalProfileOrg">
                        <div className="ModalProfileOrgLeft">
                            <img src={orgImage} alt="OrgImg"/>
                            <div className="rating">

                            </div>
                            <p>{doc.contact}</p>
                            <div className="PinIcon">
                                <img src={PinIcon} />
                            </div>
                            <p>Causes:</p>
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
                        <div className="ModalProfileOrgRight">
                            <h1>Humane Society</h1>
                            <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
                            <h2>Upcoming Events</h2>
                            <NewsItem></NewsItem>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default OrganizationCard;