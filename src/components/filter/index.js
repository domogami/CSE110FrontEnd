import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Modal from 'react-modal';
import Select from 'react-select';
import API from "../../api";

import { FilterIcon } from '../../images/icons';
import "./style.css";

const customTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: "#b153fd",
    }
});

export default function Filter({ parent }) {

    let orgFind = useRouteMatch("/findOrg");
    let eventFind = useRouteMatch("/findEvent");

    const [causes, setCauses] = useState([].concat(API.me.causes || []));
    const [skills, setSkills] = useState([].concat(API.me.skills || []));
    const [distance, setDistance] = useState(50);

    const [openedModal, setOpen] = useState("");

    return (
        <div style={{ float: "right" }}>
            {(orgFind || eventFind) && <span style={{ fontSize: "18px" }}><img src={FilterIcon}/> Filters: </span>}
            {orgFind &&
                <button className="button" onClick={() => setOpen("causes")}>Causes {causes.length ? `(${causes.length})` : ""}</button>
            }
            {eventFind &&
                <button className="button" onClick={() => setOpen("skills")}>Skills {skills.length ? `(${skills.length})` : ""}</button>
            }
            {(orgFind || eventFind) && <button className="button" onClick={() => setOpen("distance")}>within {distance} km</button>}

            <Modal
                isOpen={!!openedModal}
                onRequestClose={e => (e.stopPropagation(), setOpen(""))}
                onAfterClose={() => API.filter(skills, causes, distance, 
                    orgFind ? "organization" : "events").then(() => parent.forceUpdate())}              
                className="filterModal EventProfileModal"
            >
                {
                    (openedModal == "skills" || openedModal == "causes") ? <h2>Select Filters</h2> : <h2>Distance (within kilometers)</h2>
                }
                <div className="filterModal" >
                    <div className="filterOptions">
                        {
                            openedModal == "skills" &&
                            <Select 
                                className="entryField" isMulti options={API.ValidSkills.map(v => ({ label: v, value: v }))} 
                                theme={customTheme}
                                onChange={value => setSkills(value.map(v => v.value))}
                                defaultValue={skills.map(c => ({ label: c, value: c }))}
                            />
                        }
                        {
                            openedModal == "causes" &&
                            <Select 
                                className="entryField" isMulti options={API.ValidCauses.map(v => ({ label: v, value: v }))} 
                                theme={customTheme}
                                onChange={value => setCauses(value.map(v => v.value))}
                                defaultValue={causes.map(c => ({ label: c, value: c }))}
                            />
                        }
                        {
                            openedModal == "distance" &&
                            <div>
                                <input type="range" min="10" max="10000" 
                                    style={{ width: "90%" }}
                                    defaultValue={distance}
                                    onChange={e => setDistance(~~e.target.value)} />
                                <span>{distance} km</span>
                            </div>
                        }
                    </div>
                    
                    <div className="confirmButton" style={{ textAlign: "center" }}>
                        <button className="button" onClick={() => setOpen("")}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}
