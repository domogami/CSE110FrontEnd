import "./style.css";
import { PenIcon, PinIcon, TagIcon } from "../../images/icons";

import { Component } from "react";
import { NavLink } from "react-router-dom";
import NavHeader from "../../components/nav";
import NewsItem from "../../components/newsItem";
import API from "../../api"

class Home extends Component {

    render(){
        return (
            <div className="HomePage">
                <div className="header">
                    <NavHeader />
                </div>
                <div className="homeView">
                    <div className="homeProfileView">
                        <p>{API.me.firstname} {API.me.lastname}</p>
                        <p>{API.me.email}</p>
                        <div className="locationGroup">
                            <div className="PinIcon">
                                <img src={PinIcon} />
                            </div>
                            <p>Zip: {API.me.zip}</p>
                        </div>
                        <p>Causes:</p>
                        {
                            API.me.causes.length ? 
                            <div className="homeCausesGrid">
                                {
                                    API.me.causes.slice(0, 3).map(c => (
                                    <div className="causeTag">
                                        <img src={TagIcon} />
                                        <p>{c}</p>
                                    </div>))
                                }
                                {
                                    API.me.causes.length > 3 ? <p>More ({API.me.causes.length - 3})</p> : ""
                                }
                            </div> : <span>Empty</span>
                        }
                        <p>Skills:</p>
                        {
                            API.me.skills.length ? 
                            <div className="homeSkillsGrid">
                                {
                                    API.me.skills.slice(0, 3).map(c => (
                                    <div className="causeTag">
                                        <img src={TagIcon} />
                                        <p>{c}</p>
                                    </div>))
                                }
                                {
                                    API.me.skills.length > 3 ? <p>More ({API.me.skills.length - 3})</p> : ""
                                }
                            </div> : <span>Empty</span>
                        }
                        <button style={{color: "red"}} onClick={() => API.logout().then(window.location.href = window.origin)}>Log out</button>
                        <div className="PenIcon">
                            <div className="profileEditClickArea">
                                <NavLink activeClassName="active" className="menuButton" to="/profile">
                                    <img src={PenIcon} className="iconPen" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="newsFeed">
                        <h1>News Feed</h1>
                        <NewsItem />
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;
