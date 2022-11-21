import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import mapStyles from "./mapStyles"

const Map = ({pickUpMethod, onSel}) => {

  const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );

  const LocationPinSelected = ({ text }) => (
    <div className="pin" style={{color: "rgb(214,26,19)"}}>
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
  
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
    setZoomState({ ...zoomLevel, zoom: event.zoom, center: event.center, id: zoomLevel.id+1});
  };

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDmT9e5YEMfy2CyB2uHjUOGBgnr4oRSsm8' }}
          defaultCenter={location}
          onChange={handleZoomState}
          options={{styles: mapStyles.first}}
          zoom={zoomLevel.zoom}
          center={zoomLevel.center}
        > 
          {pickUpMethod.map(function (item) {
            if (!item.selected && item.location) {
              return <LocationPin id={item.name + item.date} lat={item.location.lat} lng={item.location.lng} />;
            }
          })}
          {pickUpMethod.map(function (item) {
            if (item.selected && item.location) {
              return <LocationPinSelected id={item.name + item.date} lat={item.location.lat} lng={item.location.lng} />;
            }
          })}
        </GoogleMapReact>
      </div>
    </div>
    );
};


export default Map