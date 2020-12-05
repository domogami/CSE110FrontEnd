import { EventEmitter } from "events";
import OrganizationCard from "../components/OrganizationCard";
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
        /** @type {{[orgID: string]: OrganizationCard}} */
        this.orgEvents = {};

        // Rating cache
        /** @type {{[ratingID: string]: RatingDocument}} */
        this.ratings = {};

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
        
        this.ValidCauses = ["Medical", "Food", "Education", "Environment", 
            "Animals", "Religious", "Human & Civil Rights", 
            "Homelessness", "Community Development"];

        this.ValidSkills = ["Cooking", "Medical Skills", "Caretaking", 
            "Photography", "Multiple Languages/Translation", 
            "Art skills", "Programming", "Engineering", 
            "Multimedia", "Teaching/Tutoring"];

        this.AgeCategories = ["10-13", "13-17", "18-30", "31-54", "55+"];
        this.initialized = false;
        this.type = "";

        this.createProfile = this.createProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    get me() { return this.profiles["@me"]; };
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
        this.initialized = true;
        return true;
    }

    logout() {
        return this.auth.signOut();
    }

    // magic number 5 seconds here (how long we want to cache the request)
    isRecent(timestamp) { return Date.now() - timestamp < 5000; }

    async createProfile(form, type) {
        const res = await fetch(`${this.base}/profile/create?type=${type}`, this.createRequestInit("POST", form));
        if (res.status == 200) return true;
        else {
            this.emit("error", new Error(`Unexpected http(s) response code: ${res.status} (${res.statusText})`));
            return false;
        }
    }

    async updateProfile(form, type) {
        // TODO:
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

    /** @param {string} orgID */
    async getRatings(orgID) {
        try {
            const res = await fetch(`${this.base}/organization/rate/${orgID}`, this.createRequestInit());
            const json = await res.json();
            json.timestamp = Date.now();
            this.ratings[orgID] = json;
            return json;
        } catch (e) {
            this.emit("error", `Error in getRatings("${orgID}")`, e);
        }
    }
}

export default new API();