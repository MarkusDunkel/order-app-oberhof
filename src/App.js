import * as React from 'react';

const App = () => {

  let [products, setProduct] = React.useState(
  [
    {
      "name": "Hirschfleisch",
      "quantity": "Kilo",
      "price": 20.4,
      "selected": new Boolean(null), 
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
      "selected": true, 
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
    newProducts[findId(newProducts, event.target.id)].selected = event.target.checked
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

const OrderList = ({products, onSel}) => {
  let temp_dict={};
  Object.assign(temp_dict, products);
  // console.log(products);
  return(
    <form>
      {products.map(function (item) {
        return (
          <div key={item.name}>
          <input id={item.name} type="checkbox" onChange={onSel} />
          <label htmlFor={item.name}>{item.name}</label>
          </div>
        )   
      }
      )}
    </form>
  );
}

const OrderOverview = () => {
  return(1);
}

export default App;
