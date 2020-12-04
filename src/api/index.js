import { EventEmitter } from "events";
import OrganizationCard from "../components/OrganizationCard";
import app from "../routes/common/base";
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
    }

    get me() { return this.profiles["@me"]; }
    get user() {  }

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

    // magic number 5 seconds here (how long we want to cache the request)
    isRecent(timestamp) { return Date.now() - timestamp < 5000; }

    async createProfile(form) {
        let res = await fetch(`${this.base}/profile/create?type=individual`, 
            this.createRequestInit("POST", form));
        return res.status == 200;
    }

    /**
     * @param {string} id 
     * @param {""|"individual"|"organization"} type 
     */
    async getProfile(id = "@me", type = "") {
        if (this.profiles[id] && this.isRecent(this.profiles[id].timestamp)) return this.profiles[id];
        try {
            const res = await fetch(`${this.base}/profile/${id}?type=${type}`, this.createRequestInit());
            const json = await res.json();
            json.timestamp = Date.now();
            json.type = type;
            this.profiles[id] = json;
            return json;
        } catch (e) {
            this.emit("error", `Error in getProfile("${id}", "${type}")`, e);
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