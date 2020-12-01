import React, {Component} from "react";
import Header from "../../components/header";
import db from "../common/base"
import "./style.css"

class Home extends Component {

    render(){
        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="homeView">
                    <div className="homeProfileView">
                        <h1>Profile</h1>
                        <p>Alan Turing</p>
                        <p>alant@gmail.com</p>
                        <div className="locationGroup">
                            <img alt="pin"/>
                            <p>San Diego, CA</p>
                        </div>
                        <div className="Gender">

                        </div>
                        <div className="Age">
                            
                        </div>
                        <p>Causes</p>
                        <div className="homeCausesGrid">
                            <div className="causeTag">
                                {/* Tag */}
                                <p>Causes</p>
                            </div>
                            <div className="causeTag">
                                {/* Tag */}
                                <p>Causes</p>
                            </div><div className="causeTag">
                                {/* Tag */}
                                <p>Causes</p>
                            </div>
                            <p>More (3)</p>
                        </div>
                        <p>Skills:</p>
                        <div className="homeSkillsGrid">
                            <div className="skillsTag">
                                {/* Tag */}
                                <p>Causes</p>
                            </div>
                            <div className="skillsTag">
                                {/* Tag */}
                                <p>Causes</p>
                            </div><div className="skillsTag">
                                {/* Tag */}
                                <p>Causes</p>
                            </div>
                            <p>More (3)</p>
                        </div>
                        <a href="/profile"></a>
                    </div>
                    <div className="newsFeed">
                        <h1>News Feed</h1>
                        
                    </div>
                </div>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </div>
        )
    }
};

export default Home;
