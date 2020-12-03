import React, {Component} from 'react';
import "./style.css";
import testImg from "../../routes/common/images/HumaneSociety.jpg"
import XIcon from "../../routes/common/images/icons/x"

export class NewsItem extends Component {
    render() {
        return (
            <div className="NewsItemWithDate">
                <p>Today</p>
                <p>Nov 12</p>
                <div className="NewsCard">
                    <div className="newsCardTimes">
                        <p>8:00 AM</p>
                        <p>9:30 AM</p>
                    </div>
                    <img src={testImg} alt="OrgPhoto"></img>
                    <div className="NewsCardText">
                        <h1>Annual Event for Some Event</h1>
                        <p>www.zoom.us/1234567890</p>
                    </div>
                    <div className="deleteNewsItem">
                        <XIcon />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default NewsItem;