
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import React from "react";
import '../css/graph.css';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            data: [{uv: 0},
                {uv: 1},
                {uv: 2},
                {uv: 3},
                {uv: 4},
                {uv: 5},
                {uv: 6},
                {uv: 7},
                {uv: 8},
                {uv: 9}],
            zero: 0
        };
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
            tempData.push({uv: state.time});
            if (tempData.length > 10) {
                tempData.shift();
            }
            return {
                time: state.time > 10 ? 0 : state.time + 1,
                data: tempData
            }
        });
    }
    render() {
        for (let i = 0; i < this.state.data.length; i++) {
            console.log(i + ": " + this.state.data[i].uv);
        }
        return (
            <div className="graph">
                <h1>Привет, мир!</h1>
                <h2>Сейчас {this.state.time}.</h2>
                <LineChart width={900} height={400} data={this.state.data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>

            </div>
        );
    }
}




export default Graph;