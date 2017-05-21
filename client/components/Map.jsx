import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const InitialMap = withGoogleMap(props => (
  <GoogleMap
  ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 37.7836966, lng: -122.4089664 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class EventMap extends Component {

constructor(props) {
  super(props);

  this.state = {
      markers: [{
        position: {
          lat: 37.7836966,
          lng: -122.4089664,
        },
        key: 'Hack Reactor',
        defaultAnimation: 2,
      }],
  };

}

  render() {
    console.log(this.state)
    return (
      <div style={{height: `100%`}}>

        <InitialMap
          containerElement={
            <div style={{ height: '100vh', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '100vh', width: '100vw' }} />
          }
          markers={this.state.markers}
        />
      </div>
    );
  }
}