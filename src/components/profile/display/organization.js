import { Component } from "react";
import { NavLink } from "react-router-dom";

import API from "../../../api";
import { PenIcon, PinIcon, TagIcon } from "../../../images/icons";

/** @extends {Component<{ doc: OrganizationDocument>} */
export default class OrganizationProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const doc = this.props.doc;
        return (
            <div className="homeProfileView">
                <p>{doc.title}</p>
                <p>{doc.contact} <a href={doc.url}>{doc.url}</a></p>
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