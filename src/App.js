import * as React from 'react';
import './App.css';
import DeliverySection from './components/delivery/Delivery'
import SelectionSection from './components/selection/Selection'
import Geocode from "react-geocode";

import { db } from "./utils/firebase";
import { onValue, ref, get, child } from "firebase/database";

// set Geocode configurations
Geocode.setApiKey("AIzaSyAAu4IxCZO863XSZ0sYrYINcpR4C3_lE64");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");

const App = () => {

  const [products, setProduct] = React.useState([]);
  const [pickUpMethod, setPickUpMethod] = React.useState([]);

  React.useEffect((products) => {
    const query = ref(db, "products");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
       Object.values(data).map((product) => {
        setProduct((products) => [...products, 
          {...product, "selected": false, "quantVal": 0, "id": product.name}]);
        });
      }
    });
  }, []);

  React.useEffect((pickUpMethod) => {
    const query = ref(db, "delivery");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
       Object.values(data).map((delivery) => {
        setPickUpMethod((pickUpMethod) => [...pickUpMethod, 
          {...delivery, "selected": false, "id": delivery.name + delivery.date}]);
        });
      }
    });
  }, []);
 
  console.log('ppppp');
  console.log(pickUpMethod);

  let [progress, setProgress] = React.useState(
    {
      "prodSel": false,
      "continuePickup":false, 
    }
  );
  
  const findId = (dictList, id) => {
    const res = [];
    for(let i = 0; i < dictList.length; i++){
      const item = dictList[i].id;
      if(item !== id){
        continue;
      };
    res.push(i);
    };
  return res;}

  const handleProductSelection = (event) => {
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

  const handleHomeAdressSelection = ([id, address, coord]) => {
    let newPickUpMethod = [...pickUpMethod];
    console.log('rrrr');
    console.log(id);
    console.log('rrrr');
    newPickUpMethod[findId(newPickUpMethod, id)].address = address;
    newPickUpMethod[findId(newPickUpMethod, id)].location = coord;
    setPickUpMethod([ ...newPickUpMethod ]);
  };

  const handlePickUpSelection = (event) => {
    let newPickUpMethod = [...pickUpMethod];
    if (event.target.id.slice(-1)==="h") {
      newPickUpMethod[findId(newPickUpMethod, event.target.id.slice(0, -1))].address = 
        event.target.value;
      newPickUpMethod[findId(newPickUpMethod, event.target.id.slice(0, -1))].location =
        event.target.value;
      
    } else {
      if (event.target.checked) {
        for(let i = 0; i < newPickUpMethod.length; i++){
          if (newPickUpMethod[i].selected) {
            newPickUpMethod[i].selected=false;
          };
        };
        newPickUpMethod[findId(newPickUpMethod, event.target.id)].selected = event.target.checked;
      };
    };

    setPickUpMethod([ ...newPickUpMethod ]);
  };
  
  return (
    <div>
      <h1>Hier kannst du eine Bestellung aufgeben :)</h1>

      <SelectionSection products={products} onSel={handleProductSelection} />

      <DeliverySection progress={progress} pickUpMethod={pickUpMethod} onSelDel={handlePickUpSelection} onSelHom={handleHomeAdressSelection} /> 
    </div>
  );
}

export default App;
