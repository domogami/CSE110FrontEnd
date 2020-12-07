import API from "../../api";
import "./select.css";

/** @param {{ parent: React.Component }} */
export default ({ parent }) => (
    <div className="selectPage">   
        <div className="pgTitle"> 
            <h4>What Type of User Are you?</h4>
        </div>
        <div className="userOptions">
            <div className="userType">
                <h3>Find opportunities to help:</h3>
                <button className="userButton" 
                        type="button" 
                        onClick={_ => (parent.type = "individual", parent.forceUpdate())}>
                            Individual
                </button>
            </div>
            <div className="userType">
                <h3>Share your events with others:</h3>
                <button className="userButton" 
                        type="button"
                        onClick={_ => (parent.type = "organization", parent.forceUpdate())}>
                            Organization
                </button>   
            </div>
        </div>
        <button className="button danger" onClick={() => API.logout().then(window.location.href = window.origin)}>Log out</button>
    </div>
);