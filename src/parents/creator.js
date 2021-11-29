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

function UserTest(color, size) {
  this.color =  color;
  this.size = size;
}

const skid1 = new UserTest('black', 12);
console.log('this is UserTest' + Object.entries(skid1));

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
      skid: {
        itemDescription: "",
        qtyNeeded: null, 
        qtyShipped: null, 
        packsRolls: null, 
        qtyPerCarton: null,
        numOfCartons: null,
        
      },

      PO: null, 
      Job: null,
      lines: 0
    }

    this.updateObj = this.updateObj.bind(this);
    this.lineNumbers = this.lineNumbers.bind(this);
    this.poJobNumbers = this.poJobNumbers.bind(this);

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

    console.log(this.state[data]);
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

      <SkidContents title={Object.keys(UserData.skid)} linesNeeded={this.state.lines} />
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
          <th key={'header' + x} class="table_header">{x}</th>
    )
  })

  let rows = props.linesNeeded;
  let i = 0;
  let arr = [];

  while(i < rows){
    i++;
    arr.push(i);
  };
  
  const newColumns = newInput.map((x, y) => {
    return(
      <td key={'column_num' + x}>
        <input class={Object.keys(UserData.skid)[y]}></input>
      </td>
    )
  })
  const newRows = arr.map((x) => {
    return(
      <tr key={'row_num' + x}>
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
