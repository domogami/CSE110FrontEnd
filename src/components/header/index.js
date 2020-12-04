import { SiteLogo } from "../../images/logo";
import "./index.css";

export default () => (
    <div className="title">
        <img src={SiteLogo} className="logo" alt="PhilConnect Logo"/>
        <h2>Philanthropy Connect</h2>
    </div>
);