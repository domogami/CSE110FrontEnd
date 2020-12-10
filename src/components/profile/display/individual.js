import { Component } from "react";
import { NavLink } from "react-router-dom";

import API from "../../../api";
import { PenIcon, PinIcon, TagIcon } from "../../../images/icons";
/*import { followingOrg } from "../../profile/display/followingOrg";*/

/** @extends {Component<{ doc: IndividualDocument>} */
export default class IndividualProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const doc = this.props.doc;
        return (
            <div className="homeProfileView">
                <p>Name: {doc.firstname} {doc.lastname}</p>
                <p>Email: {doc.email}</p>
                <div className="locationGroup">
                    <div className="PinIcon">
                        <img src={PinIcon} />
                    </div>
                    <p>Zip: {doc.zip}</p>
                </div>
                <br/>
                {
                    doc.causes.length &&
                    <div className="tagContainer">
                        <p style={{ margin: "auto 0" }}>Causes:</p>
                        {
                            doc.causes.slice(0, 3).map(c => (
                            <div className="tag">
                                <img src={TagIcon} />
                                <p>{c}</p>
                            </div>))
                        }
                        {
                            doc.causes.length > 3 ? <p style={{ margin: "auto 0" }}>More ({doc.causes.length - 3})</p> : ""
                        }
                    </div>
                }
                <br/>
                {
                    doc.skills.length &&
                    <div className="tagContainer">
                        <p style={{ margin: "auto 0" }}>Skills:</p>
                        {
                            doc.skills.slice(0, 3).map(c => (
                            <div className="tag">
                                <img src={TagIcon} />
                                <p>{c}</p>
                            </div>))
                        }
                        {
                            doc.skills.length > 3 ? <p style={{ margin: "auto 0" }}>More ({doc.skills.length - 3})</p> : ""
                        }
                    </div>
                }
                <br/>
                <div style={{display: "inline"}}>
                    <NavLink activeClassName="active" className="menuButton" to="/profile">
                        <button className="button">Edit</button>
                    </NavLink>
                    <button className="button danger" onClick={() => API.logout().then(window.location.href = window.origin)}>Log out</button>
                </div>
            </div>
        )
    }
}