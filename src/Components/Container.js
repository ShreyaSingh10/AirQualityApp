import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CityData from './CityData.js';
import './styles.css';

const client = new W3CWebSocket('ws://city-ws.herokuapp.com');
class Container extends React.Component {
    state = {
        data:[],
        clicked: false,
        city: '',
        aqi: ''
    };
    componentDidMount() {
        client.onopen = () => {
        console.log('connected')
        }

        client.onmessage = message => {
        const data = JSON.parse(message.data)
        this.setState({data});
        }

        client.onclose = () => {
        console.log('disconnected')
        }
    }

    handleClick = (value, city, aqi) => {
        this.setState({clicked : value, city, aqi});
    }
    
    render() {
        return (
            <div id="parent-container">
            {!this.state.clicked && (<div>
                <font face="Comic sans MS" size="6">
                    <h2 id="main-heading">Air Quality Monitoring</h2>
                </font>
                <div id="data-table">
                    {this.state.data.map((index) =>(
                        <CityData 
                            city={index.city}
                            aqi={index.aqi}
                            handleClick={this.handleClick}
                        />
                    ))}
                </div>
            </div>)}
            {this.state.clicked && 
            <Details 
                handleClick={this.handleClick}
                city={this.state.city}
                aqi={this.state.aqi}
            />}
            </div>
        );
    }
}

function Details(props) {
    return (
    <div className="details-card">
        <font face="Comic sans MS" size="6">
            <h2 id="details-heading">Details</h2>
        </font>
        <div id="information-list">
            <div className="info">Location : {props.city}</div>
            <div className="info">AQI : {props.aqi}</div>
        </div>
        <button id="back-button" onClick={()=> props.handleClick(false)}>BACK</button>
    </div>);
}

export default Container;