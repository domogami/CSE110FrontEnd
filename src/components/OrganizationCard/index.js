import { Component } from 'react';
import { PlusIcon, FocusIcon } from "../../images/icons";
import OrgModal from "../modal/organization";
import API from '../../api';

import "./orgCards.css";

const DEFAULT_PIC = "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg";

/**
 * @extends {Component<{ doc: OrganizationDocument }>}
 */
export class OrganizationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            color: "#fff",
            loading: false,
        };
        // console.log(this.props.doc.title, API.ind.following, this.props.doc.id);
    }

    updateFollow() {
        if (this.state.loading) return;
        this.setState({ loading: true });
        // console.log(`Toggling org#${this.props.doc.id} from: ${this.state.followed}`);
        API.follow(this.props.doc.id, !API.ind.following.includes(this.props.doc.id)).then(async () => {
            delete API.profiles["@me"];
            await API.getProfile();
            // console.log(`Toggling org#${this.props.doc.id} to: ${API.ind.following.includes(this.props.doc.id)}`);
            this.setState({ loading: false });
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div className="orgCards"
                style={this.state.color ? { backgroundColor: this.state.color } : {}}>
                <div onClick={() => this.setState({ isOpen: !this.state.isOpen})}>
                    <h5 className="orgTitle">{this.props.doc.title}</h5>
                    <div className="orgTextContainer">
                        <img src={this.props.doc.picture || DEFAULT_PIC } alt="blargh" className="orgIcon" />
                        <h5 className="orgText">{this.props.doc.mission}</h5>
                    </div>
                </div>
                <img onClick={e => this.updateFollow(e)} 
                    style={{ cursor: "pointer", opacity: this.state.loading ? 0.5 : 1, width: "15%" }}
                    src={API.ind.following.includes(this.props.doc.id) ? FocusIcon : PlusIcon} 
                    alt="Add org" className="followButton" />
                <OrgModal parent={this} />
            </div>
        );
    }
}

export default OrganizationCard;