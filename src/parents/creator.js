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
  },

  PO: null, 
  Job: null
}

function SkidItems(itemDescription, qtyNeeded, qtyShipped, packsRolls, qtyPerCarton, numOfCartons) {
  this.itemDescription = itemDescription;
  this.qtyNeeded = qtyNeeded;
  this.qtyShipped = qtyShipped;
  this.packsRolls = packsRolls;
  this.qtyPerCarton = qtyPerCarton;
  this.numOfCartons = numOfCartons;
}


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
      }, 
      skid: [],

      PO: null, 
      Job: null,
      lines: 0
    }

    this.updateObj = this.updateObj.bind(this);
    this.lineNumbers = this.lineNumbers.bind(this);
    this.poJobNumbers = this.poJobNumbers.bind(this);

    this.updateSkid = this.updateSkid.bind(this);

  }

  //This function is being used to store the data that is being input by the user.
  updateObj(e){
   
    const shipToOrFrom = e.target.className;
    const label = e.target.placeholder;

    this.setState({
      [shipToOrFrom]: {
      [label]: e.target.value.toString
      }
  });
    console.log(this.state);
  };

  //updates the number of lines that are needed for the items.
  lineNumbers(e){
    e.preventDefault();
    const linesNeeded = document.getElementById('lines_input');

    this.setState((prevState) => ({
      lines: prevState.lines = linesNeeded.value
    }));
  };

  //update the object for the po and job numbers
  poJobNumbers(e){
    const data = e.target.id;

    this.setState((prevState) => ({
      [data]: prevState = e.target.value
    }))

  }

  //update the skid items
  //we will need data from the event, the line number, and the skid item key
  updateSkid(e){

    //get the grand-parent element of the input to get the line number
    let currentElement = e.target;
    let parentOfCurrentElement = currentElement.parentElement;
    let grandParent = parentOfCurrentElement.parentElement;

    let line = "";
    let i = 0;

    while(i < grandParent.id.length){
      
      if(parseInt(grandParent.id[i]) > -1){
       line = grandParent.id[i] + line;
      }
      

      i++;
    }

    //This will return the Object key that needs manipulated
    let currentObjectItem = e.target.id;

    this.setState({
      skid:  
      [line][currentObjectItem] = e.target.value 
    })

    console.log(Object.entries(this.state.skid[line]));
  }



  render(){
  return (
    <div>
      <h1> Shipping Creator </h1>
      <p> This is where we will create all of the various labels and slips </p>

      <ShippingToFrom toFrom={'shipFrom'} header={'Shipping From'} title={Object.keys(UserData.shipFrom)} handleChange={(e, key)=> this.updateObj(e, key)}  />

      <ShippingToFrom toFrom={"shipTo"} header={'Shipping To'} title={Object.keys(UserData.shipTo)} handleChange={(e, key) => this.updateObj(e, key)} />

      <label>PO#</label>
      <input id='PO' type='text' onChange={this.poJobNumbers} ></input>

      <label>Job</label>
      <input id='Job' type='text' onChange={this.poJobNumbers}></input> 

      <label>Number of Lines Needed</label>
      <input id="lines_input" placeholder="number of lines" onChange={this.poJobNumbers}></input>

      <button type='button' onClick={this.lineNumbers}>Submit</button> 

      <SkidContents title={Object.keys(UserData.skid)} linesNeeded={this.state.lines} skidObjectsArr={this.state.skid} handleChange={this.updateSkid} />
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
          <th key={'header' + x} className="table_header">{x}</th>
    )
  })

  let rows = props.linesNeeded;
  let i = 0;
  let skidInfo = new SkidItems();

  while(i < rows){
    i++;
    props.skidObjectsArr.push(skidInfo);
  };

  
  const newColumns = newInput.map((x, y) => {
    return(
      <td id={'column_num' + y} key={'column_num' + y}>
        <input id={Object.keys(UserData.skid)[y]} onChange={props.handleChange}></input>
      </td>
    )
  })
  const newRows = props.skidObjectsArr.map((x, y) => {
    return(
      <tr id={'row_num' + y} key={'row_num' + y}>
        {newColumns}
      </tr>
    )
  })
  return(
    <table>
      <tbody>
        <tr>
          {elements}
        </tr>
        {newRows}
      </tbody>
    </table>
  )
}

export default ParentShippingCreator;
