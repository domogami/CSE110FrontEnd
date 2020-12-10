import { Component } from "react";
import NavHeader from "../../components/nav/index";
import EditEvent from "../../components/event/edit";
import API from "../../api";

import "./style.css";

class Post extends Component {

    constructor(props) {
        super(props);
       // this.state=
    }

    render() {

        return (
            <div className = "parent">
                <NavHeader />
                {/* <div className="postPage"> */}
                <div className="eventForm">
                    <EditEvent 
                        doc={{}} 
                        title="Create Event"
                        className="profileContainer"
                        redirect="/" 
                        button="Create" 
                        onSubmit={API.createEvent}
                    />
                </div>
            </div>
        )
    }
}

export default Post;