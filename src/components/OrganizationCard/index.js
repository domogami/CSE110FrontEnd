// TODO 
import React, {Component} from 'react';
import addIcon from "./+.svg";
import followedIcon from "./Focus.svg";
import "./orgCards.css"

/**
 * @extends {Component<{ doc: OrganizationDocument }>}
 */
export class OrganizationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "#f7ece6",
            followed: false,
            logo: "https://cdn.vox-cdn.com/thumbor/zEZJzZFEXm23z-Iw9ESls2jYFYA=/89x0:1511x800/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55717463/google_ai_photography_street_view_2.0.jpg",
        };
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
                <h5>{this.props.doc.title}</h5>
                <div className="orgTextContainer">
                    <img src={this.state.logo ? this.state.logo : addIcon } alt="blargh" className="orgIcon" />
                    <h5 className="orgText">
                        {this.props.doc.mission}
                    </h5>
                </div>
                <img onClick={e => this.updateFollow(e)} src={this.state.followed ? followedIcon : addIcon} alt="Add org" className="followButton">
                </img>
            </div>
        );
    }
}

export default OrganizationCard;