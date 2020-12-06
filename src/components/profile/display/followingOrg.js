import { Component } from "react";
import API from "../../../api";

export default class followingOrg extends Component{
    // Prop here will be the org id
    constructor(props) {
        super(props);
        this.doc = API.getProfile(this.props.id, "organization").then(() => this.forceUpdate());
    }
    render() {
        return (
            <div></div>
        )
    }
}
