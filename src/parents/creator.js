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
      lines: 0, 

      clicked: false
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
   
    e.preventDefault();
    //Get the correct number of lines we're going to need to extract all of the data this will be the number of times that we will need to loop.
    let lines = document.getElementsByClassName('line_data');

    let items = document.getElementsByClassName('itemDescription');
    let needed = document.getElementsByClassName('qtyNeeded');
    let shipped = document.getElementsByClassName('qtyShipped');
    let packs = document.getElementsByClassName('packsRolls');
    let carton = document.getElementsByClassName('qtyPerCarton');
    let cartons = document.getElementsByClassName('numOfCartons');

    //Get the correct number of rows and all of the contents.
    for(let i = 0; i < lines.length; i++){
      
      let currentItems = new SkidItems(items[i].value, needed[i].value, shipped[i].value, packs[i].value, carton[i].value, cartons[i].value);

      this.state.skid.push(currentItems);
    }

    if(this.state.clicked){
      this.setState({
        clicked: false
      })
    }else{
      this.setState({
        clicked: true
      })
    }

    console.log(this.state.skid);
  
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

      <SkidContents title={Object.keys(UserData.skid)} linesNeeded={this.state.lines} skidObjectsArr={this.state.skid} />
      <button id="final_submit" type='submit' onClick={this.updateSkid}>Submit</button>
     <button id="send" type='submit' style={this.state.clicked ? {display: 'block'} : {display: 'none'}}>Send</button>
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

  let skidItems = [];

  while(i < rows){
    i++;
    skidItems.push(i);
  };


  const newColumns = newInput.map((x, y) => {
    return(
      <td id={'column_num' + y} className="column_data" key={'column_num' + y}>
        <input className={Object.keys(UserData.skid)[y]}></input>
      </td>
    )
  })
  const newRows = skidItems.map((x, y) => {
    return(
      <tr id={'row_num' + y} className="line_data" key={'row_num' + y}>
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
