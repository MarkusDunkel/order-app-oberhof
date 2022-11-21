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
    let secRowLabel = item.street + " " + item.number + ",";
    let thirdRowLabel = item.code + " " + item.city;
    let genId = item.address;
    if (item.kind=="Zustellung") {
      secRowLabel = item.city+" "+item.time;
      thirdRowLabel = "";
      genId = item.city;
    }
    return (
      <div key={genId + item.date}>
        <div className={"item-boxes "+genCSSClass}>
          <div className="center-checkbox">
            <input id={genId + item.date} style={{opacity:"0"}} type="checkbox" checked={item.selected} onChange={onSel} />
          </div>
          <label htmlFor={genId + item.date}><div style={{display: "inline-block", fontWeight:"bold", paddingBottom: ".2rem"}}>{item.date}</div><br />{secRowLabel}<br />{thirdRowLabel}</label>
          <br /><br />
        </div>
      </div> 
    );
  }

  const HomeadressInput = ({item, onSel}) => {
    let street = "";
    let number = "";
    let code = "";
    let city = item.city;
    if (item.street) {street = item.street}
    if (item.number) {number = item.number}
    if (item.code) {code = item.code}
    
    return (
      <div>
        <input className="address-input" style={{width:"12rem"}} type="text" id={item.city + item.date + "a"} name={item.city + item.date + "a"} value={street} placeholder="Straße" onChange={onSel} />
        <input className="address-input" style={{width:"2rem"}} type="text" id={item.city + item.date + "b"} name={item.city + item.date + "b"} value={number} placeholder="Nr." onChange={onSel} /><br />
        <input className="address-input" style={{width:"4rem"}} type="text" id={item.city + item.date + "c"} name={item.city + item.date + "c"} value={code} placeholder="Plz." onChange={onSel} />
        <input className="address-input" style={{width:"9rem"}} type="text" id={item.city + item.date + "d"} name={item.city + item.date + "d"} value={city} placeholder="Ort" onChange={onSel} />
      </div>
    );
  }

  const PickUpListHome = ({item, onSelDel, onSelHom, progress, setProgress}) => {

    const secRowLabel = item.city+", "+item.time;
    let genCSSClass = "";

    const handleHomeAddress = (event) => {
      let address = homeForm.street+" "+homeForm.number+", "+homeForm.code+homeForm.city;
      setHomeAddress(address)
    };

    const [homeAddress, setHomeAddress] = React.useState(false);
    const [homeForm, setHomeForm] = React.useState({"id": item.id, "street": item.street, "number": item.number, "code": item.code, "city": item.city});
    if (item.selected && item.address && homeForm.street && homeForm.number && homeForm.code) {
      genCSSClass = "selectedHome plusAddress"
    } else if (item.selected) {
      genCSSClass = "selectedHome"
    }
  
    const buildHomeAddress = (event) => {
      let newHomeForm = {...homeForm};
      if (event.target.id.slice(-1)==="a") {newHomeForm.street = event.target.value}
      if (event.target.id.slice(-1)==="b") {newHomeForm.number = event.target.value}
      if (event.target.id.slice(-1)==="c") {newHomeForm.code = event.target.value}

      setHomeForm({...newHomeForm});

      if (homeForm.street && homeForm.number && homeForm.code || 
          homeForm.street && homeForm.number && event.target.id.slice(-1)==="c" && event.target.value.length > 0 ||
          homeForm.street && homeForm.code && event.target.id.slice(-1)==="b" && event.target.value.length > 0 ||
          homeForm.number && homeForm.code && event.target.id.slice(-1)==="a" && event.target.value.length > 0
          ) {
        handleHomeAddress(event)
      }
    };

    React.useEffect(() => {
        Geocode.fromAddress(homeAddress).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log("Address coord computed");
            onSelHom([homeForm.id, homeAddress, {"lat": lat, "lng": lng}, homeForm.street, homeForm.number, homeForm.code]);
          },
          (error) => {
            console.log("didn't work");
          }
        );
    }, [homeAddress]); 
    
    return (
      <div key={item.name + item.date}>
        <div className={"item-boxes "+genCSSClass}>
          <div className="center-checkbox">
            <input id={item.name + item.date} type="checkbox" checked={item.selected} onChange={onSelDel} />
          </div>
          <label htmlFor={item.address + item.date}><div style={{display: "inline-block", fontWeight:"bold", paddingBottom: ".2rem"}}>{item.date}</div><br />{secRowLabel}</label>
          <div className="address-input" >
            < HomeadressInput item={homeForm} onSel={buildHomeAddress} />
          </div>
        </div>
      </div> 
    );
  }
  
  const SelPickupKind = ({pickUpMethod, onSelDel, onSelHom, progress, setProgress}) => {
    return (
      <div className="PickBoxOuter">
        <div className="PickBoxMiddle">
          <div className="text">
            Abholung am Hof
            <br/>
            Ruf uns an unter 06764807812
          </div>
          <form className="form-delivery">
            <PickUpList item={pickUpMethod[0]} onSel={onSelDel} />
          </form>
        </div>
        <div className="PickBoxMiddle">
          <div className="text">
            Abholung beim nächsten Markt
            <br/>
            Termine:
          </div>
          <form className="form-delivery">
            {pickUpMethod.map(function (item) {
              if (item.kind==='Abholung am Markt') {
                return <PickUpList item={item} onSel={onSelDel} />
              }
            })}
          </form>
        </div>
        <div className="PickBoxMiddle">
          <div className="text">
            Lieferung zu dir nach Hause
            <br/>
            Termine:
          </div>
          <form className="form-delivery">
            {pickUpMethod.map(function (item) {
              if (item.kind==='Zustellung' && !item.selected) {
                return <PickUpList item={item} onSel={onSelDel} />
              } else if (item.kind==='Zustellung' && item.selected) {
                return <PickUpListHome item={item} onSelDel={onSelDel} onSelHom={onSelHom} progess={progress} setProgress={setProgress} />
              }
            })}
          </form>
        </div>
      </div>
    );
  }
  
const BlendInPickUpList = ({setProgress, progress, pickUpMethod, onSelDel, onSelHom}) => {
    if (progress.prodSel) {
      return (
        <div className="del">
          <h2> Wie möchtest du deine Bestellung erhalten? </h2>
          <SelPickupKind pickUpMethod={pickUpMethod} onSelDel={onSelDel} onSelHom={onSelHom} progress={progress} setProgress={setProgress} />
          <MapSection pickUpMethod={pickUpMethod} onSelDel={onSelDel}/>
        </div>
      );
    }
  }

export default BlendInPickUpList