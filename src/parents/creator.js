import * as React from "react";
import "../App.css";

const UserData = {
  shipFrom: {
    company: "",
    street: "",
    city: "", 
    state: "",
    zip: "", 
  },

  shipTo: {
    company: "",
    street: "",
    city: "", 
    state: "",
    zip: "", 
    attention: ""
  }, 

  skid: {
    itemDescription: "",
    qtyNeeded: null, 
    qtyShipped: null, 
    packsRolls: null, 
    qtyPerCarton: null,
    numOfCartons: null,
  }
}

const data = [];


class ParentShippingCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shipFrom: {
        company: "",
        street: "",
        city: "", 
        state: "",
        zip: "", 
      },
    
      shipTo: {
        company: "",
        street: "",
        city: "", 
        state: "",
        zip: "", 
        attention: ""
      }
    }

    this.updateObj = this.updateObj.bind(this);
  }

  //This function is being used to store the data that is being input by the user.
  updateObj(e){
   
    const shipToOrFrom = e.target.className;
    const label = e.target.placeholder;

    this.setState({
      [shipToOrFrom]: {
      [label]: e.target.value.toString
      }
  })
    console.log(this.state);
  }

  render(){
  return (
    <div>
      <h1> Shipping Creator </h1>
      <p> This is where we will create all of the various labels and slips </p>
      <ShippingToFrom toFrom={'shipFrom'} header={'Shipping From'} title={Object.keys(UserData.shipFrom)} handleChange={(e, key)=> this.updateObj(e, key)}  />
      <ShippingToFrom toFrom={"shipTo"} header={'Shipping To'} title={Object.keys(UserData.shipTo)} handleChange={(e, key) => this.updateObj(e, key)} />
      <SkidContents title={Object.keys(UserData.skid)} />
    </div>
  );
}
}

//This will dynamically render all of the elements needed for the shipping to and from.
const ShippingToFrom = (props) => { 
  
  let names = props.title;

  let elements = names.map((x, y) => {
   return(
  <div key={x + y.toString()}>
    <label id={props.toFrom + x}>{x}</label>
    <input id={props.toFrom + x} className={props.toFrom} type="text" placeholder={x} onChange={(e) => props.handleChange(e)}></input>
  </div>
   )
  })

  return (
    <div>
    <h2>{props.header}</h2>
      {elements}
    </div>
  )
}

const SkidContents = (props) => {
  const newInput = props.title;
  const elements = newInput.map((x, y) => {
    return (
      //<table key={y.toString() + props.name}>
        //<tbody>
         // <tr>
          <th key={'header' + x} class="table_header">{x}</th>
          //</tr>
        //</tbody>
      //</table>
    )
  })
  return(
    <table>
      <tbody>
        <tr>
          {elements}
        </tr>
      </tbody>
    </table>
  )
}
export default ParentShippingCreator;
