import * as React from "react";
import "../App.css";


//This is going to be dummy data used for development
let userDataFromCreator;
/*let userDataFromCreator = [{
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
}]*/
//async function using fetch to retrieve the data from the server
const serverCall = async () => {
  const response = await fetch(
    "http://localhost:4500/allData"
  );

  try {
    let updatedRes = await response.json();

    //this was commented out
    userDataFromCreator = updatedRes;

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
      userData: "",
      fetched: false
    };
    console.log(this.state.userData);
  }

  componentDidMount(){
    fetch('http://localhost:4500/allData')
      .then(response => response.json())
      .then(items => this.setState({
        userData: items,
        fetched: true
      }));
  }


  render() {
    return (
      <div>
        <h1>Packing Slip</h1>
        <Address 
          id="ship_from"
          fetched={this.state.fetched} 
          from={true} 
          items={this.state.fetched ? this.state.userData[0]['shipFrom'] : this.state.userData}/>
        <Address 
          id="ship_to" 
          fetched={this.state.fetched}
          from={false} 
          items={this.state.fetched ? this.state.userData[0]['shipTo'] : this.state.userData}/>
        <p id="po_num">
          {this.state.fetched ? `PO#: ${this.state.userData[0]['PO']}`: ""}
        </p>
        <JobNum 
          fetched={this.state.fetched}
          job={this.state.fetched ? this.state.userData[0]['Job'] : ''}/>
        <MainTable 
          fetched={this.state.fetched}
          items={this.state.fetched ? this.state.userData[0]['skid'] : ''}/>
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


export default ParentPackSlip;
