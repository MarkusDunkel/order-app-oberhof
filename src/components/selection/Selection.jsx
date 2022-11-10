import React from 'react'

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

const SelectionSection = ({products, onSel}) => {
    return (
      <fieldset>
        <legend> Wähle deine Produkte </legend>
        <OrderList products={products} onSel={onSel} />
      </fieldset>
    );
}
  
export default SelectionSection