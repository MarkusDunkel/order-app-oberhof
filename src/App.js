import * as React from 'react';
import './App.css';
import MapSection from './components/map/Map' // import the map here


const App = () => {

  let [products, setProduct] = React.useState(
  [
    {
      "name": "Hirschfleisch",
      "quantity": "Kilo",
      "price": 20.4,
      "selected": false, 
      "quantVal": 0,
    },
    {
      "name": "Fisch",
      "quantity": "Kilo",
      "price": 13.7,
      "selected": false, 
      "quantVal": 0,
    },
    {
      "name": "Sirup",
      "quantity": "Flaschen",
      "price": 7.8,
      "selected": false, 
      "quantVal": 0,
    }
  ]);

  let [progress, setProgress] = React.useState(
    {
      "prodSel": false,
      "continuePickup":false, 
    }
  );

  let [pickUpMethod, setPickUpMethod] = React.useState(
    [
        {
          "kind": "Abholung am Hof",
          "address": "Wien, Naschmarkt",
          "location": {lat: 47.83077274733878, lng: 14.975287682720353},
          "time": "5.02.2022",
          "selected": false,
        }, 
        {
          "kind": "Abholung am Markt",
          "address": "Wien, Markt autofreie Siedlung",
          "location": {lat: 48.191165768222916, lng: 16.295433443905797},
          "time": "2.12.2022",
          "selected": false,
        },
        {
          "kind": "Abholung am Markt",
          "address": "Wien, Naschmarkt",
          "location": {lat: 48.197797511703385, lng: 16.361496443831278},
          "time": "5.02.2022",
          "selected": false,
        },
        {
          "kind": "Zulieferung",
          "address": "Wien",
          "location": {lat: 48.197797511703385, lng: 16.361496443831278},
          "time": "5.02.2022",
          "selected": false,
        }
    ]
  );

  const findId = (products, name) => {
    const res = [];
    for(let i = 0; i < products.length; i++){
      const item = products[i].name;
      if(item !== name){
        continue;
      };
    res.push(i);
    };
  return res;}

  const handleProductSelection = (event) => {
    console.log(event.target.value)
    let newProducts = [...products];
    
    if (event.target.id.slice(-1)==="a") {
      newProducts[findId(newProducts, event.target.id.slice(0, -1))].selected = event.target.checked;
      newProducts[findId(newProducts, event.target.id.slice(0, -1))].quantVal = 0;
    }
    else if (event.target.id.slice(-1)==="b") {
      newProducts[findId(newProducts, event.target.id.slice(0, -1))].quantVal = parseInt(event.target.value)
    }

    for(let i = 0; i < products.length; i++){
      if (newProducts[i].quantVal > 0) {
        setProgress(progress => ({...progress, prodSel: true}));
        break;
      } 
      setProgress(progress => ({...progress, prodSel: false}));  
    };
    
    setProduct([ ...newProducts ]);
  };

  const handlePickUpSelection = (event) => {};

  console.log("products")
  console.log(products)
  console.log("progress")
  console.log(progress)
  
  return (
    <div>
      <h1>Hier kannst du eine Bestellung aufgeben :)</h1>

      <fieldset>
      <legend> Wähle deine Produkte </legend>
      <OrderList products={products} onSel={handleProductSelection} />
      </fieldset>

      <BlendInPickUpList progress={progress} pickUpMethod={pickUpMethod} onSel={handlePickUpSelection} />
     
      <OrderOverview />
      
        
    </div>
  );
}

const WithQuant = ({item, onSel}) => {
  return (
    <div className="sel-box" key={item.name}>
      <div className="subsel-box">
        <input id={item.name + "a"} type="checkbox" checked={item.selected} onChange={onSel} />
        <label htmlFor={item.name + "a"}>{item.name}</label>
      </div>
      <div className="subsel-box">
        <input id={item.name + "b"} type="text" onChange={onSel} />
        <label htmlFor={item.name + "b"}>{item.quantity}</label>
      </div>
    </div>)
}

const WithoutQuant = ({item, onSel}) => {
  return (
    <div key={item.name}>
      <div className="subsel-box">
        <input id={item.name + "a"} type="checkbox" checked={item.selected} onChange={onSel} />
        <label htmlFor={item.name + "a"}>{item.name}</label>
      </div>
    </div>)
}

const OrderList = ({products, onSel}) => {
  let temp_dict={};
  Object.assign(temp_dict, products);
  // console.log(products);
  return(
    <form className="formi">
      {products.map(function (item) {
        if (item.selected) {
          return <WithQuant item={item} onSel={onSel} />
        }
      return <WithoutQuant item={item} onSel={onSel} />
      }
      )}
    </form>
  );
}

const PickUpList = ({item, onSel}) => {
  return (
    <div key={item.address}>
      <div>
        <input id={item.address} type="checkbox" checked={item.selected} onChange={onSel} />
        <label htmlFor={item.address}>{item.address}</label>
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
        <form className="formi">
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
        <form className="formi">
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

const OrderOverview = () => {


  return(1);
  
}

export default App;
