import { Component, createRef } from "react";
import Modal from "react-modal";
import Chart from "chart.js";

import "./style.css";

import { XIcon } from "../../images/icons";

/** @extends {Component<{ parent: import("../profile/display/organization").default }>} */
export default class StatsModal extends Component {

    constructor(props) {
        super(props);

        /** @type {React.RefObject<HTMLCanvasElement>} */
        this.ref = createRef();
        /** @type {Chart} */
        this.chart = null;
    }

    updateStats() {
        
        const stats = this.props.parent.props.stats;
        if (!stats) {
            this.props.parent.updateStats();
            this.props.parent.setState({ isOpen: false });
            // console.log("Heck?");
            return;
        }

        if (this.chart) this.chart.destroy();

        const labels = [];
        const data = [];

        for (const key in stats.age) {
            labels.push(key);
            data.push(stats.age[key]);
        }

        const ctx = this.ref.current.getContext("2d");
        this.chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [{ 
                    label: "Follower Age Distribution",
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: { display: false },
                scales: { yAxes: [{ ticks: { stepSize: 1, min: 0 } }] }
            }
        });

        this.forceUpdate();
    }

    render() {
        return (
        <Modal 
            isOpen={this.props.parent.state.isOpen}
            onAfterOpen={() => this.updateStats()}
            contentLabel="Minimal Modal Example"
            className="profileModal fade-in"
        >
            <button className="closeModal" onClick={() => this.props.parent.setState({ isOpen: false })}><img src={XIcon}/></button>
            <div className="ModalProfileOrg">
                <h3>Follower Age Distribution</h3>
                <canvas ref={this.ref}></canvas>
            </div>
        </Modal>);
    }
}