import * as React from "react";
import "../assets/creator.scss";
import "../assets/nav.scss";

const SkidDescriptors = {
    itemDescription: "",
    qtyNeeded: null, 
    qtyShipped: null, 
    packsRolls: null, 
    qtyPerCarton: null,
    numOfCartons: null,
}

//Function to change the format of the date
const changeDateFormat = (str) => {
  let month = str[5] + str[6];
  let day = str[str.length - 2] + str[str.length - 1];
  let year = str.slice(0, 4);

  let date = `${month}/${day}/${year}`;

  return date;
}

/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @returns sends an HTTP post request to whatever url is specified and posts whatever data is supplied as the second parameter.
 */

const postData = async(url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });

  return response.json();
}

//This will create an object to store all of the information needed for the skid
class SkidItems{
constructor(itemDescription, qtyNeeded, qtyShipped, packsRolls, qtyPerCarton, numOfCartons) {
  this.itemDescription = itemDescription;
  this.qtyNeeded = qtyNeeded;
  this.qtyShipped = qtyShipped;
  this.packsRolls = packsRolls;
  this.qtyPerCarton = qtyPerCarton;
  this.numOfCartons = numOfCartons;
}
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
      date: "",

      numberOfLinesSubmitClicked: false,
      submitClicked: false, 
      showSkidHeader: false
    }

    this.updateObj = this.updateObj.bind(this);
    this.lineNumbers = this.lineNumbers.bind(this);
    this.poJobNumbers = this.poJobNumbers.bind(this);
    

    this.updateSkid = this.updateSkid.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);

  }

  
  //updates the ship to or from data fields.
  updateObj(e){
   
    const shipToOrFrom = e.target.className;
    const label = e.target.placeholder;

    this.setState({
        [shipToOrFrom]: {...this.state[shipToOrFrom], [label]: e.target.value}
      });
  };


  //updates the number of lines that are needed for the items.
  lineNumbers(e){
    e.preventDefault();
    const linesNeeded = document.getElementById('lines_input');

    this.setState((prevState) => ({
      lines: prevState.lines = linesNeeded.value, 
      numberOfLinesSubmitClicked: true, 
      showSkidHeader: true
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

    let arr = [];

    this.setState({
      skid: arr
    })

    //Get the correct number of rows and all of the contents.
    for(let i = 0; i < lines.length; i++){
      
      let currentItems = new SkidItems(items[i].value, needed[i].value, shipped[i].value, packs[i].value, carton[i].value, cartons[i].value);

      arr.push(currentItems);
    }

    this.setState({
      skid: arr
    })

     this.setState({
        clicked: true, 
        date: changeDateFormat(this.state.date)
      })
  }

  
  finalSubmit(e){

    e.preventDefault();

    //information needed for the post request, followed by the postRequest
    const url = '/shipping_creator/data';
    let userInput = this.state;
    postData(url, userInput);

    console.log(this.state.date);

}

  render(){
  return (
    <div>
      <h1> Shipping Creator </h1>

    <div id="ship_to_from">
      <ShippingToFrom divId={'shipFrom'}
                      toFrom={'shipFrom'}
                      itemClass={'ship'} 
                      header={'Shipping From'} 
                      title={Object.keys(this.state.shipFrom)} handleChange={(e, key)=> this.updateObj(e, key)}  />

      <ShippingToFrom divId={'shipTo'} 
                      toFrom={"shipTo"} 
                      itemClass={'ship'} 
                      header={'Shipping To'} 
                      title={Object.keys(this.state.shipTo)} handleChange={(e, key) => this.updateObj(e, key)} />
    </div>

    <div id="po_container">
      <label>PO#</label>
      <input id='PO' 
             type='text' 
             onChange={this.poJobNumbers}></input>

      <label>Job</label>
      <input id='Job' 
             type='text' 
             onChange={this.poJobNumbers}></input> 

      <label>Date</label>
      <input id='date' 
             type='date' 
             onChange={this.poJobNumbers}></input>

      <label>Number of Lines Needed</label>
      <input id="lines_input" 
             placeholder="number of lines" 
             onChange={this.poJobNumbers}></input>

      <button type='button' 
              onClick={this.lineNumbers}>Submit</button> 
    </div>

      <SkidContents title={Object.keys(SkidDescriptors)}
                    linesNeeded={this.state.lines} 
                    skidObjectsArr={this.state.skid}
                    hide={this.state.showSkidHeader} />

      <button id="final_submit" 
              type='submit'
              style={this.state.numberOfLinesSubmitClicked ? {display: 'block'} : {display: 'none'}} 
              onClick={this.updateSkid}>Submit</button>

     <button id="send" 
             type='submit' 
             style={this.state.clicked ? {display: 'block'} :    {display: 'none'}} 
             onClick={this.finalSubmit}>Send</button>
    </div>
  );
}
}

//This will dynamically render all of the elements needed for the shipping to and from.
const ShippingToFrom = (props) => { 
  
  let names = props.title;

  let elements = names.map((x, y) => {
   return(
  <div className="input_field" key={x + y.toString()}>
    <label id={props.toFrom + x}>{x}</label>
    <input 
      id={props.toFrom + x} 
      className={props.toFrom} 
      type="text" 
      placeholder={x} 
      onChange={(e) => props.handleChange(e)}>
    </input>
  </div>
   )
  })

  return (
    <div id={props.divId} className={props.itemClass}>
    <h2>{props.header}</h2>
      {elements}
    </div>
  )
}

const SkidContents = (props) => {
  
  const newInput = props.title;
  const elements = newInput.map((x, y) => {
    return (
          <th 
            style={props.hide ? {display:""}: {display: "none"}}
            key={'header' + x} 
            className="table_header"
          >
            {x}
          </th>
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
      <td 
        id={'column_num' + y} 
        className="column_data" 
        key={'column_num' + y}
        >
        <input className={Object.keys(SkidDescriptors)[y]}></input>
      </td>
    )
  })
  const newRows = skidItems.map((x, y) => {
    return(
      <tr 
        id={'row_num' + y} 
        className="line_data" 
        key={'row_num' + y}
      >
        {newColumns}
      </tr>
    )
  })
  return(
    <table id="main_table">
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
