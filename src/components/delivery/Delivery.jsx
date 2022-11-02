import React from 'react'
import './Delivery.css';
import MapSection from '../map/Map' 

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
  
  const SelPickupKind = ({pickUpMethod, onSel}) => {
    return (
      <div className="PickBoxOuter">
        <div className="PickBoxMiddle">
          Abholung am Hof
          <br/>
          Ruf uns an unter 06764807812
        </div>
        <div className="PickBoxMiddle">
          Abholung beim nächsten Markt
          <br/>
          Termine:
          <form className="form-delivery">
            {pickUpMethod.map(function (item) {
              if (item.kind==='Abholung am Markt') {
                return <PickUpList item={item} onSel={onSel} />
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
              if (item.kind==='Zulieferung') {
              return <PickUpList item={item} onSel={onSel} />
              }
            })}
          </form>
        </div>
      </div>
    );
  }
  
const BlendInPickUpList = ({progress, pickUpMethod, onSel}) => {
    if (progress.prodSel) {
      return (
        <fieldset>
          <legend> Wie möchtest du deine Bestellung erhalten? </legend>
          <SelPickupKind pickUpMethod={pickUpMethod} onSel={onSel} />
          <MapSection />
        </fieldset>
      );
    }
  }

export default BlendInPickUpList