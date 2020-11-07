import React, {Component} from "react";
import db from "../base"
import "../App.css"

class Home extends Component {

    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div>
                <h1>Home</h1>
                <div className="sidebar">
                
                </div>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </div>
        )
    }
};

export default Home;
