// TODO
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

    // TODO: Update information if user fills out the form and submits it
    saveFormIndividual() {
        //API.editProfile(id, this.doc).then( REFRESH PAGE )
    }

    saveFormOrg() {
        //API.editProfile(id, this.doc).then( REFRESH PAGE )
    }


    render() {

        // TODO: Obtain user's ID, use API getProfile() in order to obtain information and display it.
        const isIndividual = true;

        const indDoc = {
            firstname: "Daniel",
            lastname: "Kubeck",
            zip: "92037"
        }

        const orgDoc = {
            title: "Habitat For Humanity",
            mission: "Fixing homelessness one family at a time",
            cause: ["Medical"],
            zip: "92122",
            contact: "info@sandiegohabitat.org",
            url: "www.sandiegohabitat.org",
            events: ["new event"]
        };


        return (
            <div className = "parent">
                <div className="header">
                    <Header/>
                </div>
                <div className="viewProfileContainer">
                    { isIndividual &&
                    <div className="viewProfileField">
                        <h1>Profile</h1>
                        <h2>Click on a field to edit.</h2>
                        <form className="profileInformation">
                            <label className="fieldLabel">
                                <p>First Name</p>
                                <input className="entryField" name="firstname" type="text" placeholder={indDoc.firstname} //this.props.doc.firstname
                                       onChange={e => this.onFieldChangeIndividual(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Last Name</p>
                                <input className="entryField" name="lastname" type="text" placeholder={indDoc.lastname} //this.props.doc.lastname
                                       onChange={e => this.onFieldChangeIndividual(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>ZIP</p>
                                <input className="entryField" name="zip" type="text" placeholder={indDoc.zip}
                                       onChange={e => this.onFieldChangeIndividual(e)}/>
                            </label>
                        </form>
                        <button className="saveIndividualButton" onClick={() => this.saveFormIndividual()}>Save Profile</button>
                    </div>
                    }
                    { !(isIndividual) &&
                    <div className="viewProfileField">
                        <h1>Profile</h1>
                        <h2>Click on a field to edit.</h2>
                        <form className="profileInformation">
                            <label className="fieldLabel">
                                <p>Organization Name</p>
                                <input className="entryField" name="title" type="text" placeholder={orgDoc.title}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Mission</p>
                                <input className="entryFieldMission" name="mission" type="text" placeholder={orgDoc.mission}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>ZIP</p>
                                <input className="entryField" name="zip" type="text" placeholder={orgDoc.zip}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>Contact</p>
                                <input className="entryField" name="contact" type="text" placeholder={orgDoc.contact}
                                       onChange={e => this.onFieldChangeOrg(e)}/>
                            </label>
                            <label className="fieldLabel">
                                <p>URL</p>
                                <input className="entryField" name="url" type="text" placeholder={orgDoc.url}
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