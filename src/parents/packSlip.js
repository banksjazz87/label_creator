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
  }, 
  {
    itemDescription: "Giorgio Chopped Pieces 16oz",
    qtyNeeded: "32,000", 
    qtyShipped: "36,000", 
    packsRolls: "1,000", 
    qtyPerCarton: "16,000",
    numOfCartons: "3",
  }, 
  {
    itemDescription: "Phillips Guans 16oz",
    qtyNeeded: "48,000", 
    qtyShipped: "48,000", 
    packsRolls: "1,000", 
    qtyPerCarton: "16,000",
    numOfCartons: "3",
  }, 
  {
    itemDescription: "Giorgio Stems 16oz",
    qtyNeeded: "56,000", 
    qtyShipped: "64,000", 
    packsRolls: "1,000", 
    qtyPerCarton: "16,000",
    numOfCartons: "4",
  }, 

],

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
        <p id="po_num">{`PO#: ${this.state.userData.PO}`}</p>
        <JobNum job={this.state.userData.Job}/>
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

const JobNum = (props) => {
  const date = new Date();
  const day = date.getDate();
  const month = parseInt(date.getMonth()) + 1;
  const year = date.getYear();

  const modifiedDate = `${month}/${day}/${year}`;

  return(
    <table style={{backgroundColor: 'gray', borderWidth: '6px', borderColor: 'black'}}>
      <tr style={{backgroundColor: "purple", color: "white", boderWidth: '6px', borderColor: 'gray'}}>
        <th>Customer ID</th>
        <th>Ship Date</th>
        <th>Method Shipped</th>
        <th>Tracking#</th>
        <th>Job#</th>
      </tr>
      <tr>
        <td></td>
        <td>{modifiedDate}</td>
        <th></th>
        <th></th>
        <th>{props.job}</th>
      </tr>
    </table>
  )
}



export default ParentPackSlip;
