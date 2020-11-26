// TODO 
import React, {Component} from 'react';
import { ReactComponent as Logo } from './background.svg'
import "./orgCards.css"

export class OrganizationCard extends Component {
    // Prop will contain:
    // 0. Picture source
    // 1. Name of org
    // 2. Description
    constructor(props) {
        super(props);
        this.state = {
            showDesc: false,
            orgName: "Test",
            orgDescription: "Description",
            color: "#555555"
        };
    }

    hovering(event) {
        if ( event.type === "mouseover" ){
            this.setState({
                showDesc: true,
                orgDescription: "Over",
            });
        }
        // Event "mouseout"
        else {
            this.setState({
                showDesc: false,
                orgDescription: "Off",
            });
        }
    }

    render() {
        return <Logo 
                    className="orgCards"
                    fill={this.state.color}
                    onMouseOver={e => this.hovering(e)} 
                    onMouseOut={e => this.hovering(e)}>
                    <h2 className="orgText" style={{opacity: (this.state.showDesc ? 255 : 0)}}>
                        {this.state.orgDescription}
                    </h2>
                </Logo>;
    }
}

export default OrganizationCard;