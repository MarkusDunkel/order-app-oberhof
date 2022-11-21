import * as React from 'react';
import './App.css';
import DeliverySection from './components/delivery/Delivery';
import SelectionSection from './components/selection/Selection';
import ContactSection from './components/contact/Contact';
import SubmitData from './components/submit/Submit';
import { db } from "./utils/firebase";
import { onValue, ref, set, push } from "firebase/database";
import "@fontsource/merriweather";
// import {ReactComponent as Logo } from './logo.png';
import logo from './logo.png';

const App = () => {
  
  const [products, setProduct] = React.useState([]);
  const [pickUpMethod, setPickUpMethod] = React.useState([]);
  
  const [contact, setContact] = React.useState({
    "forname": false, 
    "surname": false,
    "email": false, 
    "phone": false
  });

  const order = {
    "basket": {
      "name": [],
      "quantity": [],
      "quantVal": [], 
      "price": []
    },
    "delivery": {
      "kind": false,
      "address": false,
      "location": {"lat": false, "lng": false},
      "date": false,
    },
    "contact": {
      "forname": false, 
      "surname": false, 
      "email": false, 
      "phone": false, 
    }
  };

  React.useEffect(() => {
    const query = ref(db, "products");
    console.log(query)
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
       Object.values(data).map((product) => {
        setProduct((products) => [...products, 
          {...product, "selected": false, "quantVal": false, "id": product.name}]);
        });
      }
    });
  }, []);

  React.useEffect(() => {
    const query = ref(db, "delivery");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
       Object.values(data).map((delivery) => {
        let address;
        let id;
        if (delivery.kind=="Zustellung") {
          address = false;
          id = delivery.city + delivery.date;
        } else {
          address = delivery.street+" "+delivery.number+", "+delivery.code+" "+delivery.city;
          id = address + delivery.date;
        }
        setPickUpMethod((pickUpMethod) => [...pickUpMethod, 
          {...delivery, "selected": false, "address": address, "id": id}
        ]) 
        });
      }
    });
  }, []);

  let [progress, setProgress] = React.useState(
    {
      "prodSel": false,
      "continuePickup": false, 
      "continueContact": false,
      "continueSubmit": false,
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
      setProgress(progress => ({...progress, prodSel: false,  continueContact: false, continueSubmit: false}));
      let newPickUpMethod = [...pickUpMethod];
      for(let i = 0; i < newPickUpMethod.length; i++) {
        if (newPickUpMethod[i].selected) {
          newPickUpMethod[i].selected=false;
        }
      }
      setPickUpMethod([ ...newPickUpMethod ]);
    };
    
    setProduct([ ...newProducts ]);
  };

  const handleHomeAdressSelection = ([id, address, coord, street, number, code]) => {
    let newPickUpMethod = [...pickUpMethod];
   
    newPickUpMethod[findId(newPickUpMethod, id)].address = address;
    newPickUpMethod[findId(newPickUpMethod, id)].location = coord;
    newPickUpMethod[findId(newPickUpMethod, id)].street = street;
    newPickUpMethod[findId(newPickUpMethod, id)].number = number;
    newPickUpMethod[findId(newPickUpMethod, id)].code = code;
    setPickUpMethod([ ...newPickUpMethod ]);
  };

  const handlePickUpSelection = (event) => {
    let newPickUpMethod = [...pickUpMethod];
    if (event.target.checked) {
      for(let i = 0; i < newPickUpMethod.length; i++){
        if (newPickUpMethod[i].selected) {
          newPickUpMethod[i].selected=false;
        }
      }
      newPickUpMethod[findId(newPickUpMethod, event.target.id)].selected = event.target.checked;
      setProgress(progress => ({...progress, continueContact: true}));
    }
    setPickUpMethod([ ...newPickUpMethod ]);
  }

  const handleContactEnter = (event) => {
    let newContact = { ...contact };
    let val = false;
    if (event.target.value.length > 0) {val = event.target.value;}
    newContact[event.target.id] = val;
    if (newContact.forname && newContact.surname && newContact.email) {setProgress(progress => ({...progress, continueSubmit: true}));}
      else {setProgress(progress => ({...progress, continueSubmit: false}));}
    setContact({ ...newContact });
  }

  const handleSubmit = (event) => {
    function fillOrder () {
      for(let i = 0; i < products.length; i++){
        if (products[i].selected) {
          order.basket.name.push(products[i].name);
          order.basket.quantity.push(products[i].quantity);
          order.basket.quantVal.push(products[i].quantVal);
          order.basket.price.push(products[i].price);
        }
      }
      for(let i = 0; i < pickUpMethod.length; i++){
        if (pickUpMethod[i].selected) {
          order.delivery.address = pickUpMethod[i].address;
          order.delivery.date = pickUpMethod[i].date;
          order.delivery.kind = pickUpMethod[i].kind;
          order.delivery.location = pickUpMethod[i].location;
        } 
      }
      order.contact.forname = contact.forname;
      order.contact.surname = contact.surname;
      order.contact.email = contact.email;
      order.contact.phone = contact.phone;
    }
    fillOrder(order);
    
    function writeData() {
      set( push( ref(db, 'orders/' ) ), {
        ...order
      } );
    }
    writeData();
  }
  
  return (
    <div className="body-container">
      <div className="hcenter">
        <div style={{display: "block", width:"10rem", margin: "0 auto"}} >
          <img  src={logo} style={{width:"10rem"}} alt="fireSpot" />
        </div>
        <div style={{display: "inline", textAlign: "center"}} >
          <h1>Hier kannst du eine Bestellung aufgeben!</h1>
        </div>
      
        < SelectionSection products={products} onSel={handleProductSelection} />

        < DeliverySection setProgress={setProgress} progress={progress} pickUpMethod={pickUpMethod} onSelDel={handlePickUpSelection} onSelHom={handleHomeAdressSelection} /> 

        < ContactSection progress={progress} contact={contact} onEnt={handleContactEnter} />

        < SubmitData progress={progress} onSub={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
