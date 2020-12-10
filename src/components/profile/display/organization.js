import { Component } from "react";
import { NavLink } from "react-router-dom";

import API from "../../../api";
import StatsModal from "../../modal/stats";
import { PinIcon, TagIcon } from "../../../images/icons";

/** @extends {Component<{ doc: OrganizationDocument, stats: OrgStats }>} */
export default class OrganizationProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            loaded: false,
        };
    }

    componentDidMount() {
        this.updateStats();
    }

    updateStats() {
        API.getStats().then(stats => {
            this.props.stats = stats;
            this.setState({ loaded: true });
        });
    }

    render() {
        const doc = this.props.doc;
        const url = doc.url.match(/http(s):\/\//) ? doc.url : `https://${doc.url}`;
        const followers = this.props.stats ? this.props.stats.followers : 0;
        return (
            <div className="homeProfileView">
                <p>{doc.title}</p>
                <p>{doc.contact} <a href={url} target="_blank">{doc.url}</a></p>
                {
                    this.state.loaded && <div>
                        <p>{followers} follower{followers > 1 ? "s" : ""} &nbsp;
                            <a className="link" onClick={() => this.setState({ isOpen: true })}>(show distribution)</a>
                            <StatsModal parent={this} /></p>
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
                            doc.causes.length > 3 ? <p style={{ margin: "auto 0" }}>More ({doc.causes.length - 3})</p> : ""
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