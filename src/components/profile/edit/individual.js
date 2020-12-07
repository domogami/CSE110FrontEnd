import { Component } from "react";
import { Redirect  } from "react-router-dom";
import Select from 'react-select';
import Joi from "joi";

import API from "../../../api";
import "./index.css";

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
    causes: Joi.array().default([]).items(
        Joi.string()
            .valid(...API.ValidCauses)
            .error(() => new Error("Invalid causes"))
    ),
    zip: Joi.string()
        .required()
        .length(5),
    skills: Joi.array().default([]).items(
        Joi.string()
            .valid(...API.ValidSkills)
    ),
    age: Joi.string() // drop down menu figure out how to do this (10-19, 20-29, etc)
        .valid(...API.AgeCategories)
        .required()
        .error(() => new Error("Invalid age range"))
};

const SkillsOptions = API.ValidSkills.map(v => ({ value: v, label: v }));
const CausesOptions = API.ValidCauses.map(v => ({ value: v, label: v }));
const AgeOptions = API.AgeCategories.map(v => ({ value: v, label: v }));

const customTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: "#b153fd",
    }
});

const textEntry = (label, name, self, type="text") => (
    <label className="fieldLabel">
        <p>{label}</p>
        <input 
            className={`entryField ${self.state.errors[name] ? "invalid" : ""}`} 
            autoComplete={Math.random()}
            type={type}
            placeholder={`Enter your ${name}`} 
            onBlur={e => self.onFieldChange(name, e)} 
            defaultValue={self.initialDoc[name]} 
        />
    </label>
);

/** @extends {Component<{ doc: IndividualDocument, title: string, button: string, doneFunc: (doc: IndividualDocument, type: string) => boolean }, { errors: { [key: string]: string } }>} */
export default class IndividualProfile extends Component {

    constructor(props) {
        super(props);
        this.props.doc.causes = this.props.doc.causes || [];
        this.props.doc.skills = this.props.doc.skills || [];
        
        const errors = {};
        for (const key in schema) errors[key] = "";
        this.state = { errors };

        this.initialDoc = Object.assign({}, this.props.doc);
        this.initialSkills = SkillsOptions.filter(s => this.props.doc.skills.includes(s.value));
        this.initialCauses = CausesOptions.filter(s => this.props.doc.causes.includes(s.value));
    }
    
    /** @param {React.ChangeEvent<HTMLInputElement>} e */
    onFieldChange(field, e) {
        const elem = e.target;
        const result = schema[field].label(field).validate(elem.value);
        // console.log(`validating: [name=${elem.name}]: ${elem.value}`, result);

        const error = (result.error || result.errors || {}).message || "";
        if (!this.state.errors[field] && error) API.emit("error", error);

        this.state.errors[field] = error;

        this.props.doc[field] = result.value;

        this.forceUpdate();
    }

    get isValid() {
        const result = Joi.object(schema).validate(this.props.doc, { stripUnknown: true });
        const error = result.error || result.errors;
        return !error;
    }
    
    submitForm() {
        if (!this.isValid) return this.forceUpdate();
        this.props.doneFunc(this.props.doc, "individual").then(async success => {
            if (success) {
                await API.init();
                this.shouldRedirect = true;
                this.forceUpdate();
            }
        });
    }

    render() {
        if (this.shouldRedirect) return <Redirect to="/" />;

        return (
            <div className="profileContainer">
                <div className="createProfileField">
                    <h4>{this.props.title || "Individual Profile"}</h4>
                    <form className="profileInformation">
                        <div className="fieldColumn-1">
                            {textEntry("First Name", "firstname", this)}
                            {textEntry("Last Name", "lastname", this)}
                            {textEntry("Zip", "zip", this)}
                            <label className="fieldLabel">
                                <p>Age</p>
                                <Select className="entryField" options={AgeOptions} theme={customTheme}
                                onChange={value => { 
                                    this.props.doc.age = value.value;
                                    this.forceUpdate();
                                }}
                                defaultValue={{ value: this.initialDoc.age, label: this.initialDoc.age }}
                                />
                            </label>
                        </div>
                        <div className="fieldColumn-2">
                            <label className="fieldLabel">
                                <p>Skills</p>
                                <Select 
                                className="entryField" isMulti options={SkillsOptions} theme={customTheme}
                                onChange={value => { 
                                    this.props.doc.skills = (value || []).map(o => o.value);
                                    this.forceUpdate();
                                }}
                                defaultValue={this.initialSkills}
                                />
                            </label>
                            <label className="fieldLabel">
                                <p>Causes</p>
                                <Select className="entryField" isMulti options={CausesOptions} theme={customTheme}
                                onChange={value => { 
                                    this.props.doc.causes = (value || []).map(o => o.value);
                                    this.forceUpdate();
                                }}
                                defaultValue={this.initialCauses}
                                />
                            </label>
                        </div>
                    </form>
                    <button className="button" disabled={!this.isValid} onClick={() => this.submitForm()}>{ this.props.button || "Button" }</button>
                </div>
            </div>
        )
    }
}