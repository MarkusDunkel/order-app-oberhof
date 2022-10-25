import * as React from 'react';
import './App.css';

const App = () => {

  let [products, setProduct] = React.useState(
  [
    {
      "name": "Hirschfleisch",
      "quantity": "Kilo",
      "price": 20.4,
      "selected": false, 
    },
    {
      "name": "Fisch",
      "quantity": "Kilo",
      "price": 13.7,
      "selected": false, 
    },
    {
      "name": "Sirup",
      "quantity": "Flaschen",
      "price": 7.8,
      "selected": false, 
    }
  ]);

  const handleProductSelection = (event) => {
    let newProducts = [...products];
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
    newProducts[findId(newProducts, event.target.id.slice(0, -1))].selected = event.target.checked
    setProduct([ ...newProducts ]);
  };

  console.log(products)
  
  return (
    <div>
      <h1>Hier kannst du eine Bestellung aufgeben :)</h1>

      <fieldset>
      <legend> Wähle deine Produkte </legend>
      <OrderList products={products} onSel={handleProductSelection} />
      </fieldset>
     
      <OrderOverview />
        
    </div>
  );
}

const WithQuant = ({item, onSel}) => {
  console.log(typeof item.name);
  return (
    <div className="sel-box" key={item.name}>
      <div className="subsel-box">
        <input id={item.name + "a"} type="checkbox" checked={item.selected} onChange={onSel} />
        <label htmlFor={item.name + "a"}>{item.name}</label>
      </div>
      <div className="subsel-box">
        <input id={item.name + "b"} type="text" />
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



const OrderOverview = () => {
  return(1);
}

export default App;
