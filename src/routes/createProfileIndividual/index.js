import React, {Component} from "react";
import { Redirect } from "react-router-dom";

//import db from "../common/base"
import logo from '../common/images/logo.svg';
import "./style.css"
import UIInterface2 from "./UIInterface2";
import Joi from "joi"
import API from "../../api/index";

const schema = {
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
    // causes: Joi.array().items(
    //     Joi.string()
    //         .valid(...validCauses)
    //         .error(() => new Error("Invalid causes"))
    // ),
    zip: Joi.string()
        .required()
        .min(5)
        .max(5),
    // skills: Joi.array().items(
    //     Joi.string()
    //         .valid(...validSkills)
    // ),
    // age: Joi.string() // drop down menu figure out how to do this (10-19, 20-29, etc)
    //     .valid(...ageCats)
    //     .required()
    //     .error(() => new Error("Invalid age range"))
};

class createProfileIndividual extends Component {

    constructor(props) {
        super(props);
        this.error = "";
        /** @type {IndividualDocument} */
        this.doc = {};
        this.shouldRedirect = false;

        window.test = this;
        //API.init();
    }

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    onFieldChange(e) {
        const elem = e.target;
        const result = schema[elem.name].validate(elem.value);
        console.log(`validating: [name=${elem.name}]: ${elem.value}`, result);

        this.error = String(result.error || result.errors || "");

        if (!this.error) this.doc[elem.name] = result.value;
        else delete this.doc[elem.name];

        this.forceUpdate();
    }

    submitForm() {
        API.createProfile(this.doc).then(result => this.shouldRedirect = result);
    }
    
    render() {
        if (this.shouldRedirect) return <Redirect to="/" />;
        return (
            <div className="parent">
                <div className="title">
                    <img src={logo} className="logo" alt="PhilConnect Logo"/>
                    <h1> Philanthropy Connect </h1>
                </div>
                <div className="createProfileContainer">
                    <div className="createProfileField">
                        <h1>Create Profile</h1>
                        <h3>{this.error}</h3>
                        <form className="profileInformation">
                            <label className="fieldLabel">
                                <p>First Name</p>
                                <input className="entryField" name="firstname" type="text" placeholder="Gary" onChange={e => this.onFieldChange(e)} />
                            </label>
                            <label className="fieldLabel">
                                <p>Last Name</p>
                                <input className="entryField" name="lastname" type="text" placeholder="Gillespie" onChange={e => this.onFieldChange(e)} />
                            </label>
                            <label className="fieldLabel">
                                <p>ZIP</p>
                                <input className="entryField" name="zip" type="text" placeholder="xxxxx" onChange={e => this.onFieldChange(e)} />
                            </label>
                        </form>
                        <button className="createIndiviudalButton" onClick={() => this.submitForm()}>Continue</button>
                    </div>
                    <div className="createProfileInfo">
                        <p>Fill in some details to get started</p>
                        <div className="UIInterfaceImage">
                            <UIInterface2 />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default createProfileIndividual;