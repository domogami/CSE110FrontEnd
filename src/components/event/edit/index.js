import { Component } from "react";
import { Redirect  } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import Joi from "joi";

import API from "../../../api";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const schema = {
    title: Joi.string()
        .min(2)
        .max(40)
        .required(),
    details: Joi.string()
        .min(2)
        .max(200)
        .required(),
    zip: Joi.string()
        .length(5)
        .required(),
    skills: Joi.array().default([]).unique().items(
        Joi.string()
            .valid(...API.ValidSkills)
    ),
    date: Joi.date().timestamp()
        .min("now")
        .raw()
        .required()
};

const SkillsOptions = API.ValidSkills.map(v => ({ value: v, label: v }));

const customTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: "#b153fd",
    }
});

const textEntry = (label, name, self, type="text") => (
    <label className="fieldLabel mediumLabel">
        <p>{label}</p>
        <input 
            className={`entryField ${self.state.errors[name] ? "invalid" : ""}`} 
            autoComplete={Math.random()}
            type={type}
            placeholder={`Enter event ${name}`} 
            onBlur={e => self.onFieldChange(name, e)} 
            defaultValue={self.initialDoc[name]} 
        />
    </label>
);

/** @extends {Component<ModalProps, { errors: { [key: string]: string }>} */
class Post extends Component {

    constructor(props) {
        super(props);

        this.props.doc.skills = this.props.doc.skills || [];

        const errors = {};
        for (const key in schema) errors[key] = "";
        this.state = { errors };

        this.initialDoc = Object.assign({}, this.props.doc);
        this.initialSkills = SkillsOptions.filter(s => this.props.doc.skills.includes(s.value));
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
        this.props.onSubmit(this.props.doc).then(success => {
            if (success) {
                this.done = true;
                this.forceUpdate();
            }
        });
    }

    deleteForm() {
        this.props.deleteFunc(this.props.doc).then(success => {
            if (success) {
                this.done = true;
                this.forceUpdate();
            }
        });
    }

    render() {
        if (this.done) {
            this.props.doneFunc && this.props.doneFunc(this.props.doc);
            if (this.props.redirect) return <Redirect to={this.props.redirect} />;
        }

        const doc = this.props.doc;

        return (
            <div>
                <h4>{this.props.title}</h4>
                <form>
                    {textEntry("Title", "title", this)}
                    {textEntry("Details", "details", this)}
                    {textEntry("Zip", "zip", this)}
                    <label className="fieldLabel mediumLabel">
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
                    <label className="fieldLabel mediumLabel">
                        <p>Date</p>
                        <DatePicker 
                            showTimeSelect
                            selected={new Date(doc.date || Date.now())}
                            onChange={date => this.onFieldChange("date", 
                                { target: { value: date.getTime() } })}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className={`entryField ${this.state.errors.date ? "invalid" : ""}`} 
                        />
                    </label>
                </form>
                {this.props.deleteFunc && <button className="button danger" onClick={() => this.deleteForm()}>{"Delete"}</button>}
                <button className="button" disabled={!this.isValid} onClick={() => this.submitForm()}>{this.props.button || "Button"}</button>
            </div>
        )
    }
}

export default Post;