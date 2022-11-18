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
    let genCSSClass = "";
    if (item.selected) {genCSSClass = "selected"}
    let secRowLabel = item.address;
    let genId = item.address;
    if (item.kind=="Zustellung") {
      secRowLabel = item.city+", "+item.time;
      genId = item.city;
    }
    return (
      <div key={genId + item.date}>
        <div className={"item-boxes "+genCSSClass}>
          <div className="center-checkbox">
            <input id={genId + item.date} style={{opacity:"0"}} type="checkbox" checked={item.selected} onChange={onSel} />
          </div>
          <label htmlFor={genId + item.date}><div style={{display: "inline-block", fontWeight:"bold", paddingBottom: ".2rem"}}>{item.date}</div><br />{secRowLabel}</label>
          <br /><br />
        </div>
      </div> 
    );
  }

  const HomeadressInput = ({item, onSel}) => {
    let street = "Straße";
    let number = "Nr.";
    let code = "Plz.";
    let city = item.city;
    if (item.street) {street = item.street}
    if (item.number) {number = item.number}
    if (item.code) {code = item.code}
    return (
      <div>
        <input className="address-input" style={{width:"12rem"}} type="text" id={item.city + item.date + "a"} name={item.city + item.date + "a"} value={street} onChange={onSel} />
        <input className="address-input" style={{width:"2rem"}} type="text" id={item.city + item.date + "b"} name={item.city + item.date + "b"} value={number} onChange={onSel} /><br />
        <input className="address-input" style={{width:"4rem"}} type="text" id={item.city + item.date + "c"} name={item.city + item.date + "c"} value={code} onChange={onSel} />
        <input className="address-input" style={{width:"9rem"}} type="text" id={item.city + item.date + "d"} name={item.city + item.date + "d"} value={city} onChange={onSel} />
      </div>
    );
  }

  const PickUpListHome = ({item, onSelDel, onSelHom}) => {

    const secRowLabel = item.city+", "+item.time;
    let genCSSClass = "";
    if (item.selected) {genCSSClass = "selected home"}

    const handleHomeAddress = (event) => {
      let address = homeStreet+" "+homeNumber+", "+homeCode+item.city;
      setHomeAddress([event.target.id.slice(0, -1), address])
    };

    const [homeAddress, setHomeAddress] = React.useState([]);
    const [homeStreet, setHomeStreet] = React.useState(false);
    const [homeNumber, setHomeNumber] = React.useState(false);
    const [homeCode, setHomeCode] = React.useState(false);

    const buildHomeAddress = (event) => {
      if (event.target.id.slice(-1)==="a") {setHomeStreet(event.target.value)}
      if (event.target.id.slice(-1)==="b") {setHomeNumber(event.target.value)}
      if (event.target.id.slice(-1)==="c") {setHomeCode(event.target.value)}

      if (homeStreet && homeNumber && homeCode){handleHomeAddress(event)}
    };

    console.log("Haddress");
    console.log(homeAddress);
    console.log("Haddress");
    React.useEffect(() => {
        Geocode.fromAddress(homeAddress[1]).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            onSelHom([homeAddress[0], homeAddress[1], {"lat": lat, "lng": lng}]);
          },
          (error) => {
            if (homeAddress.length===2) {
              onSelHom([homeAddress[0], homeAddress[1], false]);
            }
          }
        );
      }, [homeAddress[1]]); 

    return (
      <div key={item.name + item.date}>
        <div className={"item-boxes "+genCSSClass}>
          <div className="center-checkbox">
            <input id={item.name + item.date} type="checkbox" checked={item.selected} onChange={onSelDel} />
          </div>
          <label htmlFor={item.address + item.date}><div style={{display: "inline-block", fontWeight:"bold", paddingBottom: ".2rem"}}>{item.date}</div><br />{secRowLabel}</label>
          <div className="address-input" >
            Adresse: 
            < HomeadressInput item={item} onSel={buildHomeAddress} />
          </div>
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
        <div className="del">
          <h2> Wie möchtest du deine Bestellung erhalten? </h2>
          <SelPickupKind pickUpMethod={pickUpMethod} onSelDel={onSelDel} onSelHom={onSelHom} />
          <MapSection pickUpMethod={pickUpMethod} onSelDel={onSelDel}/>
        </div>
      );
    }
  }

export default BlendInPickUpList