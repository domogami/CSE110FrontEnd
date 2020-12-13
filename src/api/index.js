import { EventEmitter } from "events";
import app from "../components/app/base";
import { store } from 'react-notifications-component';

class API extends EventEmitter {

    constructor() {
        super();

        this.base = `${window.location.origin}/api`;
        this.token = null;

        this.auth = app.auth();
        // Profile cache
        /** @type {{[id: string]: IndividualDocument | OrganizationDocument}} */
        this.profiles = {};

        // Event cache
        /** @type {{[orgID: string]: OrgEventDocument}} */
        this.orgEvents = {};

        // Stats cache
        /** @type {{[orgID: string]: OrgStats}} */
        this.stats = {};

        /** @type {OrgEventDocument[]}} */
        this.feed = [];

        /** @type {{ events: OrgEventDocument[], organization: OrganizationDocument[] }} */
        this.filtered = {
            organization: [],
            events: []
        };

        this.on("success", message => {
            store.addNotification({
                title: "Success",
                message,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        });

        this.on("error", e => {
            store.addNotification({
                title: "Error",
                message: e.message || String(e) || "Unknown",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        });
        
        this.type = ""; // either "individual" or "organization" after init

        // Constants
        this.ValidCauses = ["Medical", "Food", "Education", "Environment", 
            "Animals", "Religious", "Human & Civil Rights", 
            "Homelessness", "Community Development"];

        this.ValidSkills = ["Cooking", "Medical Skills", "Caretaking", 
            "Photography", "Multiple Languages/Translation", 
            "Art skills", "Programming", "Engineering", 
            "Multimedia", "Teaching/Tutoring"];

        this.AgeCategories = ["10-13", "13-17", "18-30", "31-54", "55+"];

        this.createProfile = this.createProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.createEvent   = this.createEvent.bind(this);
        this.updateEvent   = this.updateEvent.bind(this);
        this.deleteEvent   = this.deleteEvent.bind(this);
    }

    get me() { return this.profiles["@me"]; };
    /** @returns {OrganizationDocument} */
    get org() { return this.profiles["@me"]; };
    /** @returns {IndividualDocument} */
    get ind() { return this.profiles["@me"]; };
    get isIndividual() { return this.type == "individual"; };
    get isOrganization() { return this.type == "organization"; };

    /** @returns {RequestInit} */
    createRequestInit(method = "GET", body = null) {
        if (body && typeof body != "string") body = JSON.stringify(body); 
        return {
            method,
            headers: { 
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body
        };
    }

    async init() {
        if (!this.auth.currentUser) return false;
        this.token = await this.auth.currentUser.getIdToken();
        await this.getProfile();
        return true;
    }

    logout() { return this.auth.signOut(); }

    // 1 minute in-memory request caching
    isRecent(timestamp) { return Date.now() - timestamp < 100; }

    // Profile CRU (no delete)
    async createProfile(form, type) {
        const res = await fetch(`${this.base}/profile/create?type=${type}`, this.createRequestInit("POST", form));
        if (res.status == 200) {
            this.emit("success", "Profile created");
            return true;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return false;
        }
    }

    /**
     * @param {string} id 
     * @param {""|"individual"|"organization"} type 
     */
    async getProfile(id = "@me", type = "") {
        if (this.profiles[id] && this.isRecent(this.profiles[id].timestamp)) return this.profiles[id];
        try {
            let url = `${this.base}/profile/${id}`;
            if (type) url += `?type=${type}`;
            const res = await fetch(url, this.createRequestInit());
            const json = await res.json();
            json.timestamp = Date.now();
            this.profiles[id] = json;
            if (id == "@me") {
                this.type = json.type;
                delete json.type;
            }
            return json;
        } catch (e) {
            if (id != "@me") this.emit("error", `Error in getProfile("${id}", "${type}")`, e);
        }
    }
    
    async updateProfile(form, type) {
        const res = await fetch(`${this.base}/profile/@me?type=${type}`, this.createRequestInit("PUT", form));
        if (res.status == 200) {
            this.emit("success", "Profile updated");
            return true;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return false;
        }
    }

    // EVENT CRUD
    async createEvent(form) {
        const res = await fetch(`${this.base}/events/create`, this.createRequestInit("POST", form));
        if (res.status == 200) {
            this.emit("success", "Event created");
            return true;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return false;
        }
    }

    /** @param {string} eventID */
    async getEvent(eventID) {
        if (this.orgEvents[eventID] && this.isRecent(this.orgEvents[eventID].timestamp)) return this.profiles[eventID];
        try {
            const res = await fetch(`${this.base}/events/${eventID}`, this.createRequestInit());
            const json = await res.json();
            json.timestamp = Date.now();
            this.orgEvents[eventID] = json;
            return json;
        } catch (e) {
            this.emit("error", `Error in getEvent("${eventID}")`, e);
        }
    }

    async updateEvent(form) {
        const eventID = form.id;
        delete form.id;
        const res = await fetch(`${this.base}/events/${eventID}`, this.createRequestInit("PUT", form));
        if (res.status == 200) {
            this.emit("success", "Event updated");
            return true;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return false;
        }
    }

    async deleteEvent(form) {
        const eventID = form.id;
        const res = await fetch(`${this.base}/events/${eventID}`, this.createRequestInit("DELETE"));
        if (res.status == 200) {
            this.emit("success", "Event deleted");
            return true;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return false;
        }
    }

    /** @param {string} orgID */
    async getOrgEvents(orgID) {
        try {
            const res = await fetch(`${this.base}/organization/events/${orgID}`, this.createRequestInit());
            if (res.status == 200) {
                return await res.json();
            } else {
                this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            }
        } catch (e) {
            this.emit("error", `Error in getOrgEvents("${orgID}")`, e);
        }
        return [];
    }

    
    /** @param {string} id @returns {Promise<OrgStats>} */
    async getStats(id = "@me") {
        if (this.stats[id] && this.isRecent(this.stats[id].timestamp)) return this.stats[id];
        try {
            const res = await fetch(`${this.base}/organization/stats/${id}`, this.createRequestInit());
            const json = await res.json();
            json.timestamp = Date.now();
            this.stats[id] = json;
            return json;
        } catch (e) {
            if (id != "@me") this.emit("error", `Error in getStats("${id}")`, e);
        }
    }

    async filter(skills, causes, distance, type) {
        const res = await fetch(`${this.base}/filter?type=${type}`, 
            this.createRequestInit("POST", { skills, causes, distance: distance * 1000 }));
        if (res.status == 200) {
            this.filtered[type] = await res.json();
            if (type == "events") {
                const tasks = [];
                for (const event of this.filtered.events)
                    tasks.push(this.getProfile(event.owner, "organization").then(org => event.org = org));
                await Promise.all(tasks);
            }
            return;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return;
        }
    }

    async follow(id, bool) {
        const res = await fetch(`${this.base}/organization/${id}?follow=${bool}`, this.createRequestInit("POST"));
        if (res.status == 200) {
            this.emit("success", `Organization ${bool ? "followed" : "unfollowed"}`);
            return bool;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return !bool;
        }
    }

    async getFeed() {
        const res = await fetch(`${this.base}/organization/feed?type=${this.type}`, this.createRequestInit());
        if (res.status == 200) {
            const json = await res.json();
            if (this.isIndividual) {
                this.feed = json.events;
                for (const event of this.feed)
                    event.org = json.orgs[event.org];
            } else {
                this.feed = json;
            }

            this.feed.timestamp = Date.now();
            return this.feed;
        } else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return [];
        }
    }
}

export default new API();