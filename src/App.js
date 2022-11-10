import * as React from 'react';
import './App.css';
import DeliverySection from './components/delivery/Delivery'
import SelectionSection from './components/selection/Selection'


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
          "name": "Ertltal 5",
          "address": "Ertltal 5, 3293 Lunz am See",
          "location": {lat: 47.83077274733878, lng: 14.975287682720353},
          "date": "5.02.2022",
          "selected": false,
        }, 
        {
          "kind": "Abholung am Markt",
          "name": "Wien, Karmelitermarkt",
          "address": "Karmelitermarkt, 1020 Wien",
          "location": {lat: 48.21740808775208, lng: 16.37700875585073},
          "date": "2.12.2022",
          "selected": false,
        },
        {
          "kind": "Abholung am Markt",
          "name": "Wien, Südbahnhofbrücke",
          "address": "Franz-Grill-Straße 11, 1030 Wien",
          "location": {lat: 48.178872331194995, lng: 16.394581998078078},
          "date": "5.02.2023",
          "selected": false,
        },
        {
          "kind": "Zulieferung",
          "name": "Wien - ganztägig",
          "address": null,
          "location": null,
          "date": "5.02.2023",
          "selected": false,
        },
        {
          "kind": "Abholung am Markt",
          "name": "Wien, autofreie Siedlung",
          "address": "Feßtgasse 10, 1160 Wien",
          "location": {lat: 48.21209670046745, lng: 16.32548089686887},
          "date": "12.03.2023",
          "selected": false,
        },
    ]
  );
  
  // add id expressions to lists
  const prepLists = (products, pickUpMethod) => {
    for(let i = 0; i < products.length; i++){
      products[i]["id"]=products[i].name
    };
    for(let i = 0; i < pickUpMethod.length; i++){
      pickUpMethod[i]["id"]=(pickUpMethod[i].name+pickUpMethod[i].date)
    };
    return products, pickUpMethod;
  };
  prepLists(products, pickUpMethod);

  console.log(pickUpMethod);

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

  const handlePickUpSelection = (event) => {
    let newPickUpMethod = [...pickUpMethod];
    
    if (event.target.checked) {
      for(let i = 0; i < newPickUpMethod.length; i++){
        if (newPickUpMethod[i].selected) {
          newPickUpMethod[i].selected=false;
        };
      };
    };

    newPickUpMethod[findId(newPickUpMethod, event.target.id)].selected = event.target.checked;
    setPickUpMethod([ ...newPickUpMethod ]);
  };
  
  return (
    <div>
      <h1>Hier kannst du eine Bestellung aufgeben :)</h1>

      <SelectionSection products={products} onSel={handleProductSelection} />

      <DeliverySection progress={progress} pickUpMethod={pickUpMethod} onSel={handlePickUpSelection} /> 
    </div>
  );
}

export default App;
