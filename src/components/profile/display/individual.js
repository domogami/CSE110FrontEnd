import { Component } from "react";
import { NavLink } from "react-router-dom";

import API from "../../../api";
import { PenIcon, PinIcon, TagIcon } from "../../../images/icons";

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
                    <div className="homeCausesGrid">
                        {
                            doc.causes.slice(0, 3).map(c => (
                            <div className="causeTag">
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
                    <div className="homeSkillsGrid">
                        {
                            doc.skills.slice(0, 3).map(c => (
                            <div className="causeTag">
                                <img src={TagIcon} />
                                <p>{c}</p>
                            </div>))
                        }
                        {
                            doc.skills.length > 3 ? <p>More ({doc.skills.length - 3})</p> : ""
                        }
                    </div> : <span>Empty</span>
                }
                <button onClick={() => API.logout().then(window.location.href = window.origin)}>Log out</button>
                <div className="PenIcon">
                    <div className="profileEditClickArea">
                        <NavLink activeClassName="active" className="menuButton" to="/profile">
                            <img src={PenIcon} className="iconPen" />
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}