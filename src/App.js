import * as React from 'react';
import './App.css';
import DeliverySection from './components/delivery/Delivery';
import SelectionSection from './components/selection/Selection';
import ContactSection from './components/contact/Contact';
import { db } from "./utils/firebase";
import { onValue, ref, get, child } from "firebase/database";

const App = () => {

  const [products, setProduct] = React.useState([]);
  const [pickUpMethod, setPickUpMethod] = React.useState([]);
  
  const [contact, setContact] = React.useState({
    "forname": false, 
    "surname": false,
    "email": false, 
    "phone": false
  });

  console.log(contact);

  React.useEffect((products) => {
    const query = ref(db, "products");
    console.log(query)
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

  React.useEffect(() => {
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

  let [progress, setProgress] = React.useState(
    {
      "prodSel": false,
      "continuePickup": false, 
      "continueContact": false,
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
      setProgress(progress => ({...progress, prodSel: false,  continueContact: false}));
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

  const handleHomeAdressSelection = ([id, address, coord]) => {
    let newPickUpMethod = [...pickUpMethod];
    newPickUpMethod[findId(newPickUpMethod, id)].address = address;
    newPickUpMethod[findId(newPickUpMethod, id)].location = coord;
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
    console.log(event.target.value);
    console.log(event.target.id);
    let newContact = contact;
    newContact[event.target.id] = event.target.value;
    setContact({ ...newContact });
  }
  
  return (
    <div>
      <h1>Hier kannst du eine Bestellung aufgeben :)</h1>

      < SelectionSection products={products} onSel={handleProductSelection} />

      < DeliverySection progress={progress} pickUpMethod={pickUpMethod} onSelDel={handlePickUpSelection} onSelHom={handleHomeAdressSelection} /> 

      < ContactSection progress={progress} contact={contact} onEnt={handleContactEnter}/>
    </div>
  );
}

export default App;
