import { Component } from "react";
import { Redirect  } from "react-router-dom";
import Select from 'react-select';
import Joi from "joi";

import API from "../../../api";
import "./index.css";

const schema = {
    title: Joi.string()
        .required(),
    mission: Joi.string()
        .required(),
    url: Joi.string()
        .required(),
    zip: Joi.string()
            .required()
            .length(5),
    contact: Joi.string()
            .required(),
    causes: Joi.array().unique().default([]).items(
        Joi.string()
            .valid(...API.ValidCauses)
    )
};

const CausesOptions = API.ValidCauses.map(v => ({ value: v, label: v }));

const customTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: "#b153fd",
    }
});

const textEntry = (name, self) => (<input 
    className="entryField" 
    autoComplete={Math.random()} 
    type="text" 
    placeholder={`Enter organization ${name}`} 
    onBlur={e => self.onFieldChange(name, e)} 
    defaultValue={self.initialDoc[name]} 
/>);

/** @extends {Component<{ doc: OrganizationDocument, title: string, button: string, doneFunc: (doc: IndividualDocument, type: string) => boolean }, { errors: { [key: string]: string } }>} */
export default class OrganizationProfile extends Component {

    constructor(props) {
        super(props);
        this.props.doc.causes = this.props.doc.causes || [];
        
        const errors = {};
        for (const key in schema) errors[key] = "";
        this.state = { errors };

        this.initialDoc = Object.assign({}, this.props.doc);
        this.initialCauses = CausesOptions.filter(s => this.props.doc.causes.includes(s.value));
    }
    
    /** @param {React.ChangeEvent<HTMLInputElement>} e */
    onFieldChange(field, e) {
        const elem = e.target;
        const result = schema[field].label(field).validate(elem.value);

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
        this.props.doneFunc(this.props.doc, "organization").then(async success => {
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
                    <h4>{this.props.title || "Organization Profile"}</h4>
                    <form className="profileInformation">
                        <div className="fieldColumn-2">
                            <label className="fieldLabel">
                                <p>Title</p>
                                {textEntry("title", this)}
                            </label>
                            <label className="fieldLabel">
                                <p>Mission</p>
                                {textEntry("mission", this)}
                            </label>
                            <label className="fieldLabel">
                                <p>Zip</p>
                                {textEntry("zip", this, "number")}
                            </label>
                            <label className="fieldLabel">
                                <p>Contact</p>
                                {textEntry("contact", this)}
                            </label>
                            <label className="fieldLabel">
                                <p>URL</p>
                                {textEntry("url", this)}
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