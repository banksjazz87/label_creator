import * as React from "react";
import "../assets/packSlip.scss";
import "../assets/nav.scss"
import userDataFromCreator from "../variables/dummyData"
//import serverCall from "../functions/serverCall"

class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);
  
//The code listed below is just for the DEVELOPMENT mode
this.state = {
  //switch fetched to true for development, false for production
  fetched: true, 
  //switch userData to userDataFromCreator[0] for development and "" for production
  userData: userDataFromCreator[0]
}
  }
  
  //used for PRODUCTION mode, only
  /*
  componentDidMount(){
    serverCall()
      .then(items => this.setState({
        userData: items[0],
        fetched: true
      }));
  }*/

  render() {
    if(this.state.fetched === true){
    return (
      <div id="container">
        <h1 id="header">Packing Slip</h1>
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
      <div id="table_container">
        <JobNum 
          job={this.state.userData['Job']}
          date={this.state.userData.date}
          />
        <MainTable 
          items={this.state.userData['skid']}/>
      </div>
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
      {props.from ? <p style={{fontSize: '20px', fontWeight: 'bold'}}>Ship From</p> : <p style={{fontSize: '22px', fontWeight: 'bold'}}>Ship To</p>}
      <p>{props.items.company}</p>
      <p>{props.items.street}</p>
      <p>{`${props.items.city}, ${props.items.state} ${props.items.zip}`}</p>
      {props.items.attention ? <p>{'Attention: ' + props.items.attention}</p> : null}

 
    </div>
  )
}

const JobNum = (props) => {

  return(
    <table>
      <tr id="details_header">
        <th>Customer ID</th>
        <th>Ship Date</th>
        <th>Method Shipped</th>
        <th>Tracking#</th>
        <th>Job#</th>
      </tr>
      <tr id="date_job_header">
        <td></td>
        <td>{props.date}</td>
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
    <table id="pack_slip_table">
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
