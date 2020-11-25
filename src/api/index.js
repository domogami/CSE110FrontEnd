import { EventEmitter } from "events"
import { useContext } from "react";
import { AuthContext } from "../auth/Auth";

class API extends EventEmitter {

    constructor() {
        super();

        this.base = `${window.location.origin}/api`;
        this.token = null;

        // Profile cache
        /** @type {{[id: string]: {}}} */
        this.profiles = {};

        // Event cache
        /** @type {{[orgID: string]: {}}} */
        this.orgEvents = {};

        // Rating cache
        /** @type {{[ratingID: string]: {}}} */
        this.ratings = {};
    }

    get me() { return this.profiles["@me"]; }

    /** @returns {RequestInit} */
    createRequestInit(method = "GET", body = null) {
        if (typeof body != "string") body = JSON.stringify(body); 
        return {
            method,
            headers: { "Authorization": `Bearer ${this.token}` },
            body
        };
    }

    async init() {
        const { currentUser } = useContext(AuthContext);
        if (!currentUser) return false;
        this.token = await currentUser.getIdToken();
        await this.getProfile();
        return true;
    }

    // magic number 5 seconds here (how long we want to cache the request)
    isRecent(timestamp) { return Date.now() - timestamp < 5000; }

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
        if (this.orgEvents[id] && this.isRecent(this.orgEvents[id].timestamp)) return this.profiles[id];
        try {
            const res = await fetch(`${this.base}/events/${eventID}`, this.createRequestInit());
            const json = await res.json();
            json.timestamp = Date.now();
            this.orgEvents[id] = json;
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
            this.ratings[id] = json;
            return json;
        } catch (e) {
            this.emit("error", `Error in getRatings("${orgID}")`, e);
        }
    }
}

export default new API();