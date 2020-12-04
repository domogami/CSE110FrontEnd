// TODO
import React, {Component} from "react";
import Header from "../../components/header/index";
import "./style.css";
import NewsItem from "../../components/newsItem";
import Joi from "joi";


const schema = {
    title: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .required(),
    url: Joi.string()
        .alphanum()
        .min(2)
        .max(100)
        .required(),
    address: Joi.string()
        .required()
        .min(5)
        .max(70),
    starttime: Joi.string()
        .alphanum()
        .min(2)
        .max(15)
        .required(),
    endtime: Joi.string()
        .alphanum()
        .min(2)
        .max(15)
        .required(),
    description: Joi.string()
        .alphanum()
        .min(2)
        .max(100)
        .required(),
};


class Post extends Component {

    constructor(props) {
        super(props);
        this.error = "";
        this.doc = {};
        this.shouldRedirect = false;

        window.test = this;
    }

    onFieldChange(e) {
        const elem = e.target;
        const result = schema[elem.name].validate(elem.value);
        console.log(`validating: [name=${elem.name}]: ${elem.value}`, result);

        this.error = String(result.error || result.errors || "");

        if (!this.error) this.doc[elem.name] = result.value;
        else delete this.doc[elem.name];

        this.forceUpdate();
    }

    postEvent() {
        //TODO Submit event form
    }

    render() {

        return (
            <div className = "parent">
                <div className="header">
                    <Header/>
                </div>
                <div className="postPage">
                    <div className="postGrid">
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                    </div>
                    <div className="createEvent">
                        <h2>
                            Create Event
                        </h2>
                        <form className="eventForm">
                            <label className="fieldLabel">
                                <p>Event Title</p>
                                <input className="entryField" name="title" type="text" placeholder="Feeding the Homeless"
                                       onChange={e => this.onFieldChange(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Event Description</p>
                                <input className="entryField" name="title" type="description" placeholder="Put together supply bags for the homeless."
                                       onChange={e => this.onFieldChange(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Time</p>
                                <input className="entryField" name="starttime" type="text" placeholder="Start Time"
                                       onChange={e => this.onFieldChange(e)}/>
                                <input className="entryField" name="endtime" type="text" placeholder="End Time"
                                       onChange={e => this.onFieldChange(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Event Address</p>
                                <input className="entryField" name="address" type="text" placeholder="123 Cambridge Way"
                                       onChange={e => this.onFieldChange(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Event Link</p>
                                <input className="entryField" name="url" type="text" placeholder="www.cse110.com"
                                       onChange={e => this.onFieldChange(e)}/>
                            </label>
                            <button className="postEventButton" onClick={() => this.postEvent()}>Post Event</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;