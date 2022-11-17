import React from 'react'
import './selection.css'
import { ReactComponent as Click} from './click.svg';

const MenuIcon = ({fill, stroke}) =>(
  <svg src="pic" fill={fill} stroke={stroke}></svg>
)

const WithQuant = ({item, onSel}) => {
    return (
      <div className="sel-box checked"key={item.name} >
        <div className="subsel-box first">
          <input className="check-box" id={item.name + "a"} type="checkbox" checked={item.selected} onChange={onSel} />
          <label htmlFor={item.name + "a"}>{item.name}</label>
        </div>
        <div className="subsel-box second">
          <div style={{height:"4.6rem", width: "100%", float:"left"}}>{item.quantity}</div>
          <input id={item.name + "b"} type="text" onChange={onSel} />
          <div style={{display:"inline-block"}}> Stk.</div>
          <div style={{float:"right", display: "inline"}}>{item.price} €/Stk.</div>
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
        <div className="subsel-box second">
          <Click width= "100px" height="100px" className='click-svg' />
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