import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'


const Map = () => {
  
  const location = {
    address: 'Oberhof',
    lat: 47.83077274733878, 
    lng: 14.975287682720353,
  };

  let [zoomLevel, setZoomState] = React.useState({
    zoom: 8,
    center: {lat: 47.83077274733878, lng: 14.975287682720353},
    id: 0,
  });

  const handleZoomState = (event) => {
    console.log(event.center);
    setZoomState({ ...zoomLevel, zoom: event.zoom, center: event.center, id: zoomLevel.id+1});
  };

  const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );

  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDmT9e5YEMfy2CyB2uHjUOGBgnr4oRSsm8' }}
          defaultCenter={location}
          onChange={handleZoomState}
          zoom={zoomLevel.zoom}
          center={zoomLevel.center}
        >
          <LocationPin id={zoomLevel.id}
            lat={location.lat}
            lng={location.lng}
          />
        </GoogleMapReact>
      </div>
    </div>
    );
};


export default Map