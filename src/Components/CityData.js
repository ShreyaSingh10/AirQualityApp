const roundoff = (aqiValue) => {
    return aqiValue.toFixed(2);
}

const categoryColour = (aqiValue) => {
    let value = aqiValue.toFixed(0);
    let color;
    if( value >= 0 && value <=50 ){
        color = 'green';
    }
    else if ( value >= 51 && value <= 100 ) {
        color = 'light-green';
    }
    else if ( value >= 101 && value <= 200 ) {
        color = 'yellow';
    }
    else if ( value >= 201 && value <= 300 ) {
        color = 'orange';
    }
    else if ( value >= 301 && value <= 400 ) {
        color = 'red';
    }
    else if ( value >= 401 ) {
        color = 'maroon';
    }
    return color;
}

const CityData = (props) => {
    return (
    <div className="data" onClick={() => props.handleClick(true, props.city, roundoff(props.aqi))} >
        <span className="city-value">{props.city}</span>
        <span id= {`${categoryColour(props.aqi)}`}>
            <span className="aqi-value">{roundoff(props.aqi)}</span>
        </span>
    </div>);
}

export default CityData;