import React, {Component} from "react";
import db from "../common/base"


class Home extends Component {

    render(){
        return (
            <div>
                <h1>Home</h1>
                <div className="sidebar">
                    {/* TODO */}
                </div>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </div>
        )
    }
};

export default Home;
