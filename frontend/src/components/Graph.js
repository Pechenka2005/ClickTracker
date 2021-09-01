
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import React from "react";
import '../css/graph.css';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0,
            data: []
        };
        this.doClick = this.doClick.bind(this);
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state) => {
            let tempData = state.data.slice();
            tempData.push({uv: state.clicks});
            if (tempData.length > 10) {
                tempData.shift();
            }
            return {
                clicks: 0,
                data: tempData
            }
        });
    }
    render() {
        return (
            <div className="graph">
                <h1>{this.props.name}</h1>
                <h2>За ткущую секунду: {this.state.clicks}</h2>
                <LineChart width={900} height={400} data={this.state.data}>
                    <Line type="step" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
                <button onClick={this.doClick}>
                    Click!
                </button>
            </div>
        );
    }

    doClick() {
        this.setState((state) => {
            return {
                clicks: state.clicks + 1
            }
        });
    }
}

export default Graph;