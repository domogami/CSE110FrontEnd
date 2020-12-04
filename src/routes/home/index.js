import React, {Component} from "react";
import Header from "../../components/header";
import NewsItem from "../../components/newsItem";
import db from "../common/base"
import "./style.css"
import TagIcon from "../common/images/icons/tagIcon"
import PinIcon from "../common/images/icons/pinIcon"
import PenIcon from "../common/images/icons/penIcon.svg"

class Home extends Component {

    render(){
        return (
            <div className="HomePage">
                <div className="header">
                    <Header />
                </div>
                <div className="homeView">
                    <div className="homeProfileView">
                        <h1>Profile</h1>
                        <p>Alan Turing</p>
                        <p>alant@gmail.com</p>
                        <div className="locationGroup">
                            <div className="PinIcon">
                                <PinIcon />
                            </div>
                            <p>San Diego, CA</p>
                        </div>
                        <div className="Gender">

                        </div>
                        <div className="Age">
                            
                        </div>
                        <p>Causes</p>
                        <div className="homeCausesGrid">
                            <div className="causeTag">
                                <TagIcon />
                                <p>Causes</p>
                            </div>
                            <div className="causeTag">
                                <TagIcon />
                                <p>Causes</p>
                            </div><div className="causeTag">
                                <TagIcon />
                                <p>Causes</p>
                            </div>
                            <p>More (3)</p>
                        </div>
                        <p>Skills:</p>
                        <div className="homeSkillsGrid">
                            <div className="skillsTag">
                                <TagIcon />
                                <p>Causes</p>
                            </div>
                            <div className="skillsTag">
                                <TagIcon />
                                <p>Causes</p>
                            </div>
                            <div className="skillsTag">
                                <TagIcon />
                                <p>Causes</p>
                            </div>
                            <p>More (3)</p>
                        </div>
                        
                        
                            
                        <div className="PenIcon">
                            <a href="/profile" >
                                <div className="profileEditClickArea">
                                    <img src={PenIcon} alt="Edit Profile" className="iconPen"></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="newsFeed">
                        <h1>News Feed</h1>
                        <NewsItem />
                    </div>
                </div>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </div>
        )
    }
};

export default Home;
