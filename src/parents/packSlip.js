import * as React from "react";
import "../assets/packSlip.scss";
import "../assets/nav.scss"

//userDataFromCreator for development only
//import userDataFromCreator from "../variables/dummyData"

import MathFunctions from "../functions/mathFunctions.js";
import serverCall from "../functions/serverCall"
import changeDateFormat from "../functions/dateFormat.js"


class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);
  
//The code listed below is just for the DEVELOPMENT mode
this.state = {
  //switch fetched to true for development, false for production
  fetched: false, 
  //switch userData to userDataFromCreator[0] for development and "" for production
  userData: ""
}
  }
  
  //used for PRODUCTION mode, only 
  componentDidMount(){
    serverCall("/allData")
      .then(items => this.setState({
        userData: items[0],
        fetched: true
      }));
  }

  render() {
    if(this.state.fetched === true){
    return (
      <div id="container">
        <h1 id="packing_slip_header">Packing Slip</h1>
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
          date={changeDateFormat(this.state.userData.date)}
          />
        <MainTable 
          items={this.state.userData['skid']}
          totalCartons={this.state.userData['totalCartons']}
          total={this.state.userData['totalQty']}
          />
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

/**
 * 
 * @param {*} arr 
 * @param {*} itemNum 
 * @returns text for the cartonText field. 
 */
  const skidText = (arr, itemNum) => {
   
    let text = "";
     
    arr[itemNum].numOfCartons > 1 ? 
    text = `${arr[itemNum].numOfCartons} Cartons @ ${arr[itemNum].qtyPerCarton} (Packs/Rolls @ ${arr[itemNum].packsRolls})` :

     text = `${arr[itemNum].numOfCartons} Carton @ ${arr[itemNum].qtyPerCarton} (Packs/Rolls @ ${arr[itemNum].packsRolls})`

     return text;
  }


  /**
   * 
   * @returns an array of objects with a cartonText field added to it. All duplicate items with the same name are conoslidated to one object.
   */
  const checkForDuplicateItems = () => {

    let newArr = props.items;

   for(let i = 0; i < newArr.length; i ++){
      
    if( newArr[i + 1] && newArr[i + 1].itemDescription === newArr[i].itemDescription){
        
        while(newArr[i].itemDescription === newArr[i + 1].itemDescription){
        
          newArr[i].cartonText = skidText(newArr, i) + " " + skidText(newArr, i + 1);
          

          
          let sum = 
          MathFunctions.numOrNot(newArr[i].qtyShipped) + MathFunctions.numOrNot(newArr[i + 1].qtyShipped);

          newArr[i].qtyShipped = MathFunctions.commaPlacer(sum);

          newArr.splice(i + 1, 1);
        }

      }else{
        
        newArr[i].cartonText = skidText(newArr, i);
      }
    }
      
    return newArr;
  }

  
  const noDuplicates = checkForDuplicateItems();

  const menuItems = noDuplicates.map((x, y) => {
    return(
    <>
      <tr key={'row' + y} id="description_row">
        <td id="qty_needed" class="item_info qty">{noDuplicates[y].qtyNeeded}</td>
        <td id="item_description" class="item_info">{noDuplicates[y].itemDescription}</td>
        <td id="qty_shipped" class="item_info qty">{noDuplicates[y].qtyShipped}</td>
      </tr>
      <tr key={'description' + y}>
      <td></td>
        <td class="item_info">{noDuplicates[y].cartonText}</td>
      </tr>
      <td></td>
    </>
    )
  })
  return(
    <table id="pack_slip_table">
      <tr id="qty_desc_ship_headers">
        <th>Quantity</th>
        <th>Description</th>
        <th>Ship Quantity</th>
      </tr>
      {menuItems}
      <tr id="total_cartons" className="totals">
        <th></th>
        <th>Total Cartons</th>
        <td>{props.totalCartons}</td>
      </tr>
      <tr id="total_quantity" className="totals">
        <th></th>
        <th>Total Quantity</th>
        <td>{props.total}</td>
      </tr>
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
