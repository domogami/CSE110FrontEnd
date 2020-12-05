import { Component, useState } from 'react';
import { matchPath, useRouteMatch } from 'react-router-dom';
import { FilterIcon } from '../../images/icons';

import "./style.css";

export default function Filter () {
    
    let orgFind = useRouteMatch("/findOrg");
    let eventFind = useRouteMatch("/findEvent");

    const [filterCauses, setCauses] = useState(0);
    const [filterSkills, setCauses] = useState(0);
    const [filterDistance, setCauses] = useState(0);

    const [isOpen, setOpen] = useState(false);

    return(
        <div>
            {orgFind && 
                <button className="filterButton" onClick={()=>{
                    setOpen(true);

                }}> Causes </button>
            }

            {eventFind && 
                <button className="filterButton"> Skills </button>
            }

            <button className="filterButton"> Distance </button>

            <Modal 
                    isOpen={this.state.isOpen}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                    className="EventProfileModal"
                >
              
                    <button className="closeModal" onClick={() => this.setState({ isOpen: false })}><img src={XIcon}/></button>
                    
                    <div className="ModalProfileEvent">
                        <div className="ModalProfileEventLeft">
                            <img src={eventImage} alt="EventImg"/>
                            <div className="rating">

                            </div>
                            <p>Test@example.com</p>
                            <div className="PinIcon">
                                <img src={PinIcon} />
                            </div>
                            <p>Causes:</p>
                            <p>Skills:</p>
                        </div>
                        <div className="ModalProfileEventRight">
                            <h1>Humane Society</h1>
                            <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
                            <h2>Upcoming Events</h2>
                            <NewsItem></NewsItem>
                        </div>
                    </div>
                </Modal>


            

        </div>
    )
    
}
