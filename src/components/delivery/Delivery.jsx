import React from 'react';
import './Delivery.css';
import MapSection from '../map/Map';
import Geocode from "react-geocode";

// set Geocode configurations
Geocode.setApiKey("AIzaSyAAu4IxCZO863XSZ0sYrYINcpR4C3_lE64");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");

const PickUpList = ({item, onSel}) => {
    return (
      <div key={item.name + item.date}>
        <div>
          <span className="center-checkbox">
            <input id={item.name + item.date} type="checkbox" checked={item.selected} onChange={onSel} />
          </span>
          <label htmlFor={item.name + item.date}>{item.date}<br />{item.name}</label>
          <br /><br />
        </div>
      </div> 
    );
  }

  const HomeadressInput = ({item, onSel}) => {
    console.log(item)
    return (
      <input type="text" id={item.name + item.date} name={item.name + item.date + "h"} onChange={onSel} />
    );
  }

  const PickUpListHome = ({item, onSelDel, onSelHom}) => {
    
    const handleHomeAddress = (event) => {
      setHomeAddress([event.target.id, event.target.value])
    };
    const [homeAddress, setHomeAddress] = React.useState([]);
    const [homeCords, setHomeCords] = React.useState([]);
    React.useEffect(() => {
        console.log("Hello There!")
        console.log(homeAddress[1])
        console.log("Hello There!")
        Geocode.fromAddress(homeAddress[1]).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log({"lat": lat, "lng": lng});
            console.log('Bin drinnen!')
            setHomeCords({"lat": lat, "lng": lng});
            onSelHom([homeAddress[0], homeAddress[1], {"lat": lat, "lng": lng}]);
          },
          (error) => {
            console.log("Not found");
            console.log("unknown");
          }
        );
      }, [homeAddress[1]]);

    console.log('hhhhhhhhhhhhhhhhhhhhhhh');
    console.log(homeAddress);
    console.log(homeCords);
    console.log('hhhhhhhhhhhhhhhhhhhhhhh');

    return (
      <div key={item.name + item.date}>
        <div>
          <span className="center-checkbox">
            <input id={item.name + item.date} type="checkbox" checked={item.selected} onChange={onSelDel} />
          </span>
          <label htmlFor={item.name + item.date}>{item.date}<br />{item.name}</label>
          <br /><br />
          Adresse: 
          < HomeadressInput item={item} onSel={handleHomeAddress} />
        </div>
      </div> 
    );
  }
  
  const SelPickupKind = ({pickUpMethod, onSelDel, onSelHom}) => {
    return (
      <div className="PickBoxOuter">
        <div className="PickBoxMiddle">
          Abholung am Hof
          <br/>
          Ruf uns an unter 06764807812
          <form className="form-delivery">
            <PickUpList item={pickUpMethod[0]} onSel={onSelDel} />
          </form>
        </div>
        <div className="PickBoxMiddle">
          Abholung beim nächsten Markt
          <br/>
          Termine:
          <form className="form-delivery">
            {pickUpMethod.map(function (item) {
              if (item.kind==='Abholung am Markt') {
                return <PickUpList item={item} onSel={onSelDel} />
              }
            })}
          </form>
        </div>
        <div className="PickBoxMiddle">
          Lieferung zu dir nach Hause
          <br/>
          Termine:
          <form className="form-delivery">
            {pickUpMethod.map(function (item) {
              if (item.kind==='Zustellung' && !item.selected) {
                return <PickUpList item={item} onSel={onSelDel} />
              } else if (item.kind==='Zustellung' && item.selected) {
                return <PickUpListHome item={item} onSelDel={onSelDel} onSelHom={onSelHom} />
              }
            })}
          </form>
        </div>
      </div>
    );
  }
  
const BlendInPickUpList = ({progress, pickUpMethod, onSelDel, onSelHom}) => {
    if (progress.prodSel) {
      return (
        <fieldset>
          <legend> Wie möchtest du deine Bestellung erhalten? </legend>
          <SelPickupKind pickUpMethod={pickUpMethod} onSelDel={onSelDel} onSelHom={onSelHom} />
          <MapSection pickUpMethod={pickUpMethod} onSelDel={onSelDel}/>
        </fieldset>
      );
    }
  }

export default BlendInPickUpList