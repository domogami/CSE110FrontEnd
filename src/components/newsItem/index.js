import { Component } from 'react';

import { OrgProfile } from "../../images/placeholder";
import { XIcon } from "../../images/icons";
import "./style.css";


/** @extends {Component<{ feed: OrgEventDocument[] }>} */
export class NewsItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO: render according to this.props.feed
        return <div></div>;
        // return (
        //     <div className="NewsItemWithDate">
        //         <p>Today</p>
        //         <p>Nov 12</p>
        //         <div className="NewsCard">
        //             <div className="newsCardTimes">
        //                 <p>8:00 AM</p>
        //                 <p>9:30 AM</p>
        //             </div>
        //             <img src={OrgProfile} alt="OrgPhoto"></img>
        //             <div className="NewsCardText">
        //                 <h1>Annual Event for Some Event</h1>
        //                 <p>www.zoom.us/1234567890</p>
        //             </div>
        //             <div className="deleteNewsItem">
        //                 <img src={XIcon} />
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}

export default NewsItem;