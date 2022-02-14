import * as React from "react";
import "../assets/creator.scss";
import "../assets/creatorMediaQueries.scss";
import "../assets/nav.scss";
import MathFunctions from "../functions/mathFunctions.js";

console.log(sessionStorage);
console.log(JSON.parse(sessionStorage.getItem('userData')));

//This function will return all of the userData that is stored in the session storage object, and return it as an object.
let allSessionData = {};

const sessionStorageData = () => {
  if(sessionStorage.length > 0){
    allSessionData = JSON.parse(sessionStorage.getItem('userData'));
  }
}

sessionStorageData();
console.log(allSessionData);

window.onload = () => console.log('hello again');


const SkidDescriptors = {
    qtyNeeded: null, 
    itemDescription: "",
    packsRolls: null, 
    qtyPerCarton: null,
    numOfCartons: null,
    qtyShipped: null
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

  constructor(qtyNeeded, itemDescription, packsRolls, qtyPerCarton, numOfCartons, qtyShipped){

  this.qtyNeeded = qtyNeeded;
  this.itemDescription = itemDescription;
  this.packsRolls = packsRolls;
  this.qtyPerCarton = qtyPerCarton;
  this.numOfCartons = numOfCartons;
  this.qtyShipped = qtyShipped;
}
}

class ParentShippingCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: "",
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
      
      totalCartons: 0,
      totalQty: 0,

      numberOfLinesSubmitClicked: false,
      submitClicked: false, 
      showSkidHeader: false,
      changing: false 
    }

    this.updateObj = this.updateObj.bind(this);
    this.lineNumbers = this.lineNumbers.bind(this);
    this.poJobNumbers = this.poJobNumbers.bind(this);
    

    this.updateSkid = this.updateSkid.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
    this.numberOnChange = this.numberOnChange.bind(this);

    this.clearInput = this.clearInput.bind(this);
    this.updateShipFromTo = this.updateShipFromTo.bind(this);
  }
 
  componenetDidMount(){
    console.log('the dom has been loaded');
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

      let currentItems = new SkidItems(needed[i].value, items[i].value, packs[i].value, carton[i].value, cartons[i].value, shipped[i].value);

      arr.push(currentItems);
    }

    this.setState({
      skid: arr
    })

     this.setState({
        clicked: true, 
        date: changeDateFormat(this.state.date)
      })

   this.setState({
     totalCartons: MathFunctions.total("numOfCartons"),
     totalQty: MathFunctions.total("qtyShipped")
   })

   this.updateShipFromTo("shipFrom");
   
  }

  //This function will post all of the data that has been supplied by the user, to the server.
  finalSubmit(e){

    e.preventDefault();

    //information needed for the post request, followed by the postRequest
    const url = '/shipping_creator/data';
    let userInput = this.state;
    postData(url, userInput);

   //Using the session storage object to keep track if there is an active session
   sessionStorage.setItem('currentSession', 'running');
   sessionStorage.setItem('userData', JSON.stringify(this.state));

   console.log('this is the final state', this.state);

}

//function to automatically added a comma to a number that should have a comma, based on its length.
numberOnChange(e){
  e.preventDefault();
  
  if(parseInt(e.target.value)){
    let newValue = MathFunctions.numOrNot(e.target.value);
    e.target.value = MathFunctions.commaPlacer(newValue);
  }else{
    e.target.value = "";
    alert("Please insert a valid number");
  }
}

//This function will clear the data in an input field and change the changing state to true.
clearInput(e){
  e.target.value = null;

  this.setState({
    changing: true
  })
}

//This function will loop over the elements by className and placeholder to update the state, and this function will be ran on the final submit.
updateShipFromTo(name){
  const allClass = document.getElementsByClassName(name);

  let arr = [];

  for(let i = 0; i < allClass.length; i++){

    let currentPlaceHolder = allClass[i].placeholder;

    this.setState(prevState => ({
      [name]: {...prevState[name],[currentPlaceHolder]: allClass[i].value}
    }))

    //arr.push(allClass[i].value);
    arr.push(currentPlaceHolder);
  }
  console.log('look right here', this.state[name]);
  console.log(arr);
}



  render(){
  return (
    <div id="creator_container">
      <h1 id="header"> Shipping Creator </h1>

    <div id="ship_to_from_po">
      <ShippingToFrom divId={'shipFrom'}
                      toFrom={'shipFrom'}
                      itemClass={'ship'} 
                      header={'Shipping From'} 
                      title={Object.keys(this.state.shipFrom)} handleChange={(e, key)=> this.updateObj(e, key)}
                      handleClick ={this.clearInput}
                      itemEdit={this.state.changing}
                      />

      <ShippingToFrom divId={'shipTo'} 
                      toFrom={"shipTo"} 
                      itemClass={'ship'} 
                      header={'Shipping To'} 
                      title={Object.keys(this.state.shipTo)} handleChange={(e, key) => this.updateObj(e, key)}
                     />

    <div id="po_container">
    <h2 className="header">Shipping 
    Details</h2>
    <hr/>
      <PoInput 
        labelName='PO#'
        dataID='PO'
        handleOnChange={this.poJobNumbers}
      />
    
    <PoInput 
      labelName="Job"
      dataID='Job'
      handleOnChange={this.poJobNumbers}
    />

      <PoInput
        labelName='Date'
        dataID='date'
        differentType='date'
        handleOnChange={this.poJobNumbers}
      />

      <PoInput
        labelName={'Lines Needed'}
        differentType='number'
        dataID='lines_input'
        placeholderText='number of lines'
        handleOnChange={this.poJobNumbers}
      />

      <button type='button' 
              onClick={this.lineNumbers}>Submit</button> 
    </div>

    </div>

      <SkidContents title={Object.keys(SkidDescriptors)}
                    linesNeeded={this.state.lines} 
                    skidObjectsArr={this.state.skid}
                    hide={this.state.showSkidHeader} 
                    changeHandler={this.numberOnChange}
                    />

    <div id="final_buttons">
      <button id="final_submit" 
              type='submit'
              style={this.state.numberOfLinesSubmitClicked ? {display: 'block'} : {display: 'none'}} 
              onClick={this.updateSkid}>Submit</button>

     <button id="send" 
             type='submit' 
             style={this.state.clicked ? {display: 'block'} : {display: 'none'}} 
             onClick={this.finalSubmit}>Send</button>
    </div>

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
      placeHolder={x} 
      type="text"  
      onChange={(e) => props.handleChange(e)}
      onClick={props.handleClick}
      value={sessionStorage.getItem('currentSession') === 'running' && props.itemEdit === false ? allSessionData[props.toFrom][x] : null}
      >
    </input>
  </div>
   )
  })

  return (
    <div id={props.divId} className={props.itemClass}>
    <h2>{props.header}</h2>
    <hr/>
      {elements}
    </div>
  )
}

const PoInput = (props) => {
  return (
    <div className="po_inputs">
      <label>{props.labelName}</label> 
      <input 
        id={props.dataID} 
        type={props.differentType ? props.differentType : "text"} 
        placeHolder={props.placeholderText ? props.placeholderText : ""} 
        onChange={props.handleOnChange}> 
      </input>
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
            id={`${x}_header`}
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
        <input className={Object.keys(SkidDescriptors)[y]} 
        onChange={Object.keys(SkidDescriptors)[y] !== "itemDescription" ? props.changeHandler : null} ></input>
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
        <tr id="header_row">
          {elements}
        </tr>
        {newRows}
      </tbody>
    </table>
  )
}

export default ParentShippingCreator;
