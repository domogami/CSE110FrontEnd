// TODO 
import React, {Component} from 'react';
import "./orgCards.css"

/**
 * @extends {Component<{ doc: OrganizationDocument }>}
 */
export class OrganizationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDesc: false,
            orgName: "Test",
            orgDescription: "Description"
        };
    }

    render() {
        return (
            <div className="orgCards"
                style={this.state.color ? {backgroundColor: this.state.color} : {}}>
                <h5>{this.props.doc.title}</h5>
                <div>
                    <h5 className="orgText">
                        {this.props.doc.mission}
                    </h5>
                </div>
            </div>
        );
    }
}

export default OrganizationCard;