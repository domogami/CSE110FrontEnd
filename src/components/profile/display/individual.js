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
                <p>{doc.firstname} {doc.lastname}</p>
                <p>{doc.email}</p>
                <div className="locationGroup">
                    <div className="PinIcon">
                        <img src={PinIcon} />
                    </div>
                    <p>Zip: {doc.zip}</p>
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
                <p>Skills:</p>
                {
                    doc.skills.length ? 
                    <div className="tagContainer">
                        {
                            doc.skills.slice(0, 3).map(c => (
                            <div className="tag">
                                <img src={TagIcon} />
                                <p>{c}</p>
                            </div>))
                        }
                        {
                            doc.skills.length > 3 ? <p>More ({doc.skills.length - 3})</p> : ""
                        }
                    </div> : <span>Empty</span>
                }
{/*TODO*/}                
{/*                <p>Following:</p> 
                {
                    doc.following.length ?
                    <div className="followContainer">
                        {doc.following.map(c => (
                            <div className="org">
                                <p>{c}</p>

                            </div>
                        ))}
                    </div> : <span>Empty</span>
                }
*/}
                <div style={{display: "inline"}}>
                    <button className="button danger" onClick={() => API.logout().then(window.location.href = window.origin)}>Log out</button>
                    <NavLink activeClassName="active" className="menuButton" to="/profile">
                        <button className="button">Edit</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}