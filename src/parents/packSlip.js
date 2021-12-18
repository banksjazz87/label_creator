import * as React from "react";
import "../App.css";


//This is going to be dummy data used for development
let userDataFromCreator = [{
  shipFrom: {
    company: "Seneca Printing Express",
    street: "191 Howard Street",
    city: "Franklin", 
    state: "PA",
    zip: "16323", 
  },

  shipTo: {
    company: "Chris Banks",
    street: "402 Myrtle Street",
    city: "Emlenton", 
    state: "PA",
    zip: "16232", 
    attention: "Chris"
  }, 

  skid: [{
    itemDescription: "Giorgio Whole Whites 16oz",
    qtyNeeded: "16,000", 
    qtyShipped: "18,000", 
    packsRolls: "1,000", 
    qtyPerCarton: "16,000",
    numOfCartons: "2",
  }],

  PO: "54791", 
  Job: "176592"
}]
//async function using fetch to retrieve the data from the server
const serverCall = async () => {
  const response = await fetch(
    "http://localhost:4500/allData"
  );

  try {
    let updatedRes = await response.json();
    //userDataFromCreator = updatedRes;
    console.log(updatedRes);
  } catch (e) {
    console.log("error", e);
  }
};



class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);
    
    //Make This active before production
    //set the response from the serverCall to equal userDataFromCreator
    //serverCall();
    
    this.state = {
      userData: userDataFromCreator[0]
    };
    console.log(this.state.userData);
  }


  render() {
    return (
      <div>
        <h1>Packing Slip</h1>
        <Address id="ship_from" from={true} items={this.state.userData.shipFrom}/>
        <Address id="ship_to" from={false} items={this.state.userData.shipTo}/>
      </div>
    );
  }
}

const Address = (props) => {
  return(
    <div className={props.id}>
      {props.from ? <p style={{fontSize: '20px'}}>Ship From</p> : <p style={{fontSize: '20px'}}>Ship To</p>}
      <p>{props.items.company}</p>
      <p>{props.items.street}</p>
      <p>{`${props.items.city}, ${props.items.state} ${props.items.zip}`}</p>
      {props.items.attention ? <p>{'Attention: ' + props.items.attention}</p> : null}

 
    </div>
  )
}

export default ParentPackSlip;
