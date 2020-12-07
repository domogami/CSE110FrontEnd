import { Component } from "react";
import { NavLink } from "react-router-dom";

import API from "../../../api";
import { PinIcon, TagIcon } from "../../../images/icons";

/** @extends {Component<{ doc: OrganizationDocument, stats: OrgStats, loaded: boolean>} */
export default class OrganizationProfile extends Component {

    constructor(props) {
        super(props);
        this.props.stats = {};
        this.updateStats();
    }

    updateStats() {
        this.props.loaded = false;
        API.getStats().then(stats => {
            this.props.stats = stats;
            this.props.loaded = true;
            this.forceUpdate();
        })
    }

    render() {
        const doc = this.props.doc;
        const url = doc.url.match(/http(s):\/\//) ? doc.url : `https://${doc.url}`;
        return (
            <div className="homeProfileView">
                <p>{doc.title}</p>
                <p>{doc.contact} <a href={url} target="_blank">{doc.url}</a></p>
                {
                    this.props.loaded && <div>
                        <p>Followers: {this.props.stats.followers}</p>
                        <p>Ratings: {this.props.stats.ratingsCount}</p>
                    </div>
                }
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