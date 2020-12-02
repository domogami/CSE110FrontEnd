import React, {Component} from "react";
import Header from "../../components/header/index";
import "./style.css"

import db from "../common/base"

import logo from '../common/images/logo.svg';
import Joi from "joi";
import API from "../../api/index";

const schemaIndividual = {
    firstname: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .required(),
    lastname: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .required(),
    zip: Joi.string()
        .required()
        .min(5)
        .max(5),
};

const schemaOrg = {
    title: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .required(),
    mission: Joi.string()
        .alphanum()
        .min(2)
        .max(400) //what should the max length be?
        .required(),
    zip: Joi.string()
        .required()
        .min(5)
        .max(5),
    contact: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .required(),
    url: Joi.string()
        .alphanum()
        .min(2)
        .max(100) //is this right type?
        .required(),
};


class Profile extends Component {

    constructor(props) {
        super(props);
        this.error = "";
        this.doc = {};
        this.shouldRedirect = false;

        window.test = this;
    }

    onFieldChangeIndividual(e) {
        const elem = e.target;
        const result = schemaIndividual[elem.name].validate(elem.value);
        console.log(`validating: [name=${elem.name}]: ${elem.value}`, result);

        this.error = String(result.error || result.errors || "");

        if (!this.error) this.doc[elem.name] = result.value;
        else delete this.doc[elem.name];

        this.forceUpdate();
    }

    onFieldChangeOrg(e) {
        const elem = e.target;
        const result = schemaOrg[elem.name].validate(elem.value);
        console.log(`validating: [name=${elem.name}]: ${elem.value}`, result);

        this.error = String(result.error || result.errors || "");

        if (!this.error) this.doc[elem.name] = result.value;
        else delete this.doc[elem.name];

        this.forceUpdate();
    }

    //Below functions are for submitting the new information
    saveFormIndividual() {

    }

    saveFormOrg() {

    }


    render() {
        //Fill these in with current logged in user's information
        const indFirstName = "Daniel";
        const indLastName = "Kubeck";
        const indZip = {};

        const orgTitle = "American Red Cross";
        const orgMission = {};
        const orgContact = {};
        const orgZip = "92037";
        const orgURL = {};

        //Find a way to determine if the user is an org or an individual, used in the conditional rendering
        const isOrg = true;

        return (
            <div className = "parent">
                <div className="header">
                    <Header/>
                </div>
                <div className="viewProfileContainer">
                    { !(isOrg) &&
                    <div className="viewProfileField">
                        <h1>Profile</h1>
                        <h2>Click on a field to edit.</h2>
                        <form className="profileInformation">
                            <label className="fieldLabel">
                                <p>First Name</p>
                                <input className="entryField" name="firstname" type="text" placeholder={indFirstName}
                                       onChange={e => this.onFieldChangeIndividual(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Last Name</p>
                                <input className="entryField" name="lastname" type="text" placeholder={indLastName}
                                       onChange={e => this.onFieldChangeIndividual(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>ZIP</p>
                                <input className="entryField" name="zip" type="text" placeholder={indZip}
                                       onChange={e => this.onFieldChangeIndividual(e)}/>
                            </label>
                        </form>
                        <button className="saveIndividualButton" onClick={() => this.saveFormIndividual()}>Save Profile</button>
                    </div>
                    }
                    { isOrg &&
                    <div className="viewProfileField">
                        <h1>Profile</h1>
                        <h2>Click on a field to edit.</h2>
                        <form className="profileInformation">
                            <label className="fieldLabel">
                                <p>Organization Name</p>
                                <input className="entryField" name="title" type="text" placeholder={orgTitle}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Mission</p>
                                <input className="entryFieldMission" name="mission" type="text" placeholder={orgMission}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>ZIP</p>
                                <input className="entryField" name="zip" type="text" placeholder={orgZip}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Contact</p>
                                <input className="entryField" name="contact" type="text" placeholder={orgContact}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>URL</p>
                                <input className="entryField" name="URL" type="text" placeholder={orgURL}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                        </form>
                        <button className="saveOrgButton" onClick={() => this.saveFormOrg()}>Save Profile</button>
                    </div>
                    }
                </div>
            </div>
        )
    }
};

export default Profile;