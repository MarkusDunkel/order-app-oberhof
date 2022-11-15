import React from 'react'
import './selection.css'

const WithQuant = ({item, onSel}) => {
    return (
      <div className="sel-box checked"key={item.name} >
        <div className="subsel-box first">
          <input className="check-box" id={item.name + "a"} type="checkbox" checked={item.selected} onChange={onSel} />
          <label htmlFor={item.name + "a"}>{item.name}</label>
        </div>
        <div className="subsel-box second">
          <input id={item.name + "b"} type="text" onChange={onSel} />
          <label htmlFor={item.name + "b"}>{item.quantity}</label>
        </div>
      </div>)
  }
  
const WithoutQuant = ({item, onSel}) => {
    return (
      <div className="sel-box" key={item.name}>
        <div className="subsel-box first">
          <input className="check-box" id={item.name + "a"} type="checkbox" checked={item.selected} onChange={onSel} />
          <label htmlFor={item.name + "a"}>{item.name}</label>
        </div>
      </div>)
  }
  
const OrderList = ({products, onSel}) => {
    let temp_dict={};
    Object.assign(temp_dict, products);
    return(
      <form className="form">
        {products.map(function (item) {
          if (item.selected) {
            return <WithQuant key={item.id} item={item} onSel={onSel} />
          }
        return <WithoutQuant key={item.id}  item={item} onSel={onSel} />
        }
        )}
      </form>
    );
  }

const SelectionSection = ({products, onSel}) => {
    return (
      <div className="sel">
        <br />
        <br />
        <h2> Wähle deine Produkte: </h2>
        <OrderList products={products} onSel={onSel} />
      </div>
    );
}
  
export default SelectionSection