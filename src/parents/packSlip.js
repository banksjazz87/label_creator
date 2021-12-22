import * as React from "react";
import "../App.css";
import serverCall from "./serverCall.js"


//This is going to be dummy data used for development
//let userDataFromCreator;
let userDataFromCreator = [{
  shipFrom: {
    company: "Seneca Printing Express",
    street: "191 Howard Street",
    city: "Franklin", 
    state: "PA",
    zip: "16323", 
    phone: '814-671-2074'
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
/*const serverCall = async () => {
  const response = await fetch(
    "http://localhost:4500/allData"
  );

  try {
    let updatedRes = await response.json();

    //this was commented out
    //userDataFromCreator = updatedRes;
    console.log(updatedRes);
    return updatedRes;

  } catch (e) {
    console.log("error", e);
  }
};*/



class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);
  
//The code listed below is just for the development mode
/*
this.state = {
  fetched: true, 
  userData: userDataFromCreator[0]
}
  }
  */
//The code listed below is for the production mode
    this.state = {
      userData: "",
      fetched: false
    };
  }

  
  componentDidMount(){
    serverCall()
      .then(items => this.setState({
        userData: items[0],
        fetched: true
      }));
  }

  render() {
    if(this.state.fetched === true){
    return (
      <div>
        <h1>Packing Slip</h1>
        <Address 
          id="ship_from"
          from={true} 
          items={this.state.userData['shipFrom']}/>
        <Address 
          id="ship_to" 
          from={false} 
          items={this.state.userData['shipTo']}/>
        <p id="po_num">
          {`PO#: ${this.state.userData['PO']}`}
        </p>
        <JobNum 
          job={this.state.userData['Job']}/>
        <MainTable 
          items={this.state.userData['skid']}/>
        <ThankYou phone={this.state.userData['shipFrom']['phone']} />
      </div>
    );
    }else{
      return(
      <h1>Fetching currently</h1>
      )
    }
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
  const year = date.getFullYear();

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

const MainTable = (props) => {
  
  const menuItems = props.items.map((x, y) => {
    return(
    <>
      <tr key={'row' + y}>
        <td>{props.items[y].qtyNeeded}</td>
        <td>{props.items[y].itemDescription}</td>
        <td>{props.items[y].qtyShipped}</td>
      </tr>
      <tr key={'description' + y}>
      <td></td>
        {props.items[y].numOfCartons > 1 ? 
        <td>{props.items[y].numOfCartons + " Cartons @ " + props.items[y].qtyPerCarton + " (Packs/Rolls @  " + props.items[y].packsRolls + ")"}</td>
        : 
        <td>{props.items[y].numOfCartons + " Carton @ " + props.items[y].qtyPerCarton + " (Packs/Rolls @  " + props.items[y].packsRolls + ")"}</td>}
      </tr>
      <td></td>
    </>
    )
  })
  return(
    <table>
      <tr>
        <th>Quantity</th>
        <th>Description</th>
        <th>Ship Quantity</th>
      </tr>
      {menuItems}
    </table>
  )
}

const ThankYou = (props) => {
  return(
    <p id="thank_you_text">{`Please contact Accounts Receivable (${props.phone}) with any questions or concerns`}
    <br/>
    <b>Thank you for your business!</b>
    </p>
    
  )
}


export default ParentPackSlip;
