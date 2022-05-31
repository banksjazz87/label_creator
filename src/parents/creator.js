import * as React from "react";
import "../assets/creator.scss";
import "../assets/creatorMediaQueries.scss";
import "../assets/nav.scss";
import MathFunctions from "../functions/mathFunctions.js";
import postData from "../functions/postRequest.js";
import serverCall from "../functions/serverCall";
import deleteData from "../functions/deleteRequest";

const SkidDescriptors = {
  qtyNeeded: null,
  itemDescription: "",
  packsRolls: null,
  qtyPerCarton: null,
  numOfCartons: null,
  qtyShipped: null,
};

//This will create an object to store all of the information needed for the skid
class SkidItems {
  constructor(
    qtyNeeded,
    itemDescription,
    packsRolls,
    qtyPerCarton,
    numOfCartons,
    qtyShipped
  ) {
    this.qtyNeeded = qtyNeeded;
    this.itemDescription = itemDescription;
    this.packsRolls = packsRolls;
    this.qtyPerCarton = qtyPerCarton;
    this.numOfCartons = numOfCartons;
    this.qtyShipped = qtyShipped;
  }
}

//Data stored in the session storage object
const currentSessionData = JSON.parse(sessionStorage.getItem("userData"));

const currentStorageRunning = () => {
  if (sessionStorage.getItem("currentSession") === "running") {
    return true;
  } else {
    return false;
  }
};

const returnValue = (value) => {
  if (sessionStorage.getItem("currentSession") === "running") {
    return value;
  } else {
    return value;
  }
};

const currentlyRevising = () => {
  if (sessionStorage.getItem("revising")) {
    return true;
  } else {
    return false;
  }
};

class ParentShippingCreator extends React.Component {
  constructor(props) {
    super(props);
    if (currentSessionData) {
      this.state = currentSessionData;
    } else {
      this.state = {
        userData: "",
        retrieved: false,
        shipFrom: {
          company: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
        },

        shipTo: {
          company: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          attention: "",
        },
        skid: [],

        PO: null,
        Job: null,
        lines: 0,
        addingLines: 0,
        date: "",

        totalCartons: 0,
        totalQty: 0,

        numberOfLinesSubmitClicked: false,
        submitClicked: false,
        showSkidHeader: false,
        changing: false,
        deleteItems: false,
        deleteMessage: false,
        packageUnit: "",
      };
    }

    this.callToDatabase = this.callToDatabase.bind(this);
    this.callToServer = this.callToServer.bind(this);
    this.updateObj = this.updateObj.bind(this);
    this.lineNumbers = this.lineNumbers.bind(this);
    this.poJobNumbers = this.poJobNumbers.bind(this);
    this.updateSkid = this.updateSkid.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
    this.numberOnChange = this.numberOnChange.bind(this);
    this.updateSkidItem = this.updateSkidItem.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.addLine = this.addLine.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.showDeleteMessage = this.showDeleteMessage.bind(this);
    this.hideDeleteMessage = this.hideDeleteMessage.bind(this);
    this.definePackageUnit = this.definePackageUnit.bind(this);
  }

  componentDidMount() {
    if (currentStorageRunning() && currentlyRevising()) {
      this.callToServer();
    } else if (currentlyRevising() && currentStorageRunning() === false) {
      this.callToDatabase();
    } else if (currentStorageRunning() && currentlyRevising() === false) {
      this.callToServer();
    }
  }

  callToDatabase() {
    serverCall("/chosen/data").then((res) =>
      this.setState((prevState) => ({
        ...(prevState = res),
        retrieved: true,
      }))
    );
  }

  callToServer() {
    serverCall("/allData").then((res) =>
      this.setState((prevState) => ({
        ...(prevState = res[0]),
        retrieved: true,
      }))
    );
  }

  //updates the ship to or from data fields.
  updateObj(e) {
    const shipToOrFrom = e.target.className;
    const label = e.target.placeholder;

    this.setState({
      [shipToOrFrom]: { ...this.state[shipToOrFrom], [label]: e.target.value },
    });
  }

  //updates the number of lines that are needed for the items.
  lineNumbers() {
    const linesNeeded = document.getElementById("lines");
    this.setState((prevState) => ({
      lines: (prevState.lines = linesNeeded.value),
      numberOfLinesSubmitClicked: true,
      showSkidHeader: true,
      clicked: false,
    }));
  }

  //update the object for the po and job numbers
  poJobNumbers(e) {
    e.preventDefault();
    const data = e.target.id;

    this.setState({
      [data]: e.target.value,
    });
  }

  //update the skid items
  //we will need data from the event, the line number, and the skid item key
  updateSkid() {
    //Get the correct number of lines we're going to need to extract all of the data this will be the number of times that we will need to loop.
    let lines = document.getElementsByClassName("line_data");
    let items = document.getElementsByClassName("itemDescription");
    let needed = document.getElementsByClassName("qtyNeeded");
    let shipped = document.getElementsByClassName("qtyShipped");
    let packs = document.getElementsByClassName("packsRolls");
    let carton = document.getElementsByClassName("qtyPerCarton");
    let cartons = document.getElementsByClassName("numOfCartons");
    let arr = [];
    this.setState({
      skid: arr,
    });
    //Get the correct number of rows and all of the contents.
    for (let i = 0; i < lines.length; i++) {
      let currentItems = new SkidItems(
        needed[i].value,
        items[i].value,
        packs[i].value,
        carton[i].value,
        cartons[i].value,
        shipped[i].value
      );
      arr.push(currentItems);
    }
    this.setState({
      skid: arr,
      clicked: true,
      totalCartons: MathFunctions.total("numOfCartons"),
      totalQty: MathFunctions.total("qtyShipped"),
    });
  }

  //This function will post all of the data that has been supplied by the user, to the server.
  finalSubmit(e) {
    e.preventDefault();

    //information needed for the post request, followed by the postRequest
    const url = "/shipping_creator/data";
    let userInput = this.state;
    postData(url, userInput);

    //Using the session storage object to keep track if there is an active session
    sessionStorage.setItem("currentSession", "running");
    sessionStorage.setItem("userData", JSON.stringify(this.state));
  }

  //function to automatically added a comma to a number that should have a comma, based on its length.
  numberOnChange(e) {
    e.preventDefault();

    if (parseInt(e.target.value)) {
      let newValue = MathFunctions.numOrNot(e.target.value);
      e.target.value = MathFunctions.commaPlacer(newValue);

      this.updateSkidItem(e);
    } else {
      e.target.value = "";
      alert("Please insert a valid number");
    }
  }

  //This function will clear the data in an input field and change the changing state to true.
  clearInput(e) {
    e.target.value = null;

    this.setState({
      changing: true,
    });
  }

  //This function will be used to update the state of the skid item, if the session storage is true.
  updateSkidItem(e) {
    e.preventDefault();

    if (currentStorageRunning() || currentlyRevising()) {
      let currentId = e.target.id;
      let rowNum = MathFunctions.numbers(currentId);
      let name = e.target.className;

      this.setState((prevState) => ({
        skid: { ...prevState.skid[rowNum], [name]: e.target.value },
      }));
    }
  }

  addLine() {
    this.setState((prev) => ({
      lines: parseInt(prev.lines) + 1,
      clicked: false,
    }));
  }

  removeLine(e) {
    if (this.state.skid.length > 0) {
      const parent = e.target.parentElement;
      const lineNumber = MathFunctions.numbers(parent.id);
      this.setState((prev) => ({
        skidItems: prev.skid.splice(lineNumber, 1),
        lines: parseInt(prev.lines) - 1,
      }));
    } else {
      this.setState((prev) => ({
        lines: parseInt(prev.lines) - 1,
      }));
    }
  }

  deleteAll(e) {
    e.preventDefault();
    sessionStorage.setItem("revising", false);
    deleteData("/delete_current_item", this.state);
    this.confirmDelete();
  }

  confirmDelete() {
    this.setState({
      deleteItems: true,
    });
    this.hideDeleteMessage();
    alert("One document has been deleted");
    window.location.href = "/";
  }

  cancelDelete(e) {
    e.preventDefault();
    this.setState({
      deleteItems: false,
    });
    this.hideDeleteMessage();
  }

  showDeleteMessage() {
    this.setState({
      deleteMessage: true,
    });
  }

  hideDeleteMessage() {
    this.setState({
      deleteMessage: false,
    });
  }

  definePackageUnit(e) {
    this.setState({
      packageUnit: e.target.value,
      
    });
  }

  render() {
    return (
      <div id="creator_container">
        <h1 id="header"> Shipping Creator </h1>

        <div id="ship_to_from_po">
          <ShippingToFrom
            divId={"shipFrom"}
            toFrom={"shipFrom"}
            itemClass={"ship"}
            header={"Shipping From"}
            title={Object.keys(this.state.shipFrom)}
            itemValue={this.state.shipFrom}
            handleChange={(e, key) => this.updateObj(e, key)}
          />

          <ShippingToFrom
            divId={"shipTo"}
            toFrom={"shipTo"}
            itemClass={"ship"}
            header={"Shipping To"}
            title={Object.keys(this.state.shipTo)}
            itemValue={this.state.shipTo}
            handleChange={(e, key) => this.updateObj(e, key)}
          />

          <div id="po_container">
            <h2 className="header">Shipping Details</h2>
            <hr />
            <PoInput
              labelName="PO#"
              dataID="PO"
              itemValue={this.state.PO}
              handleOnChange={this.poJobNumbers}
            />

            <PoInput
              labelName="Job"
              dataID="Job"
              itemValue={this.state.Job}
              handleOnChange={this.poJobNumbers}
            />

            <PoInput
              labelName="Date"
              dataID="date"
              differentType="date"
              itemValue={this.state.date}
              handleOnChange={this.poJobNumbers}
            />

            <PackType 
              changeHandler={this.definePackageUnit} 
              unitType={this.state.packageUnit}
              currentlyChecked={this.state.checked}
            />

            <PoInput
              labelName="Lines Needed"
              differentType="number"
              dataID="lines"
              placeholderText="number of lines"
              itemValue={this.state.lines ? this.state.lines : ""}
              handleOnChange={this.poJobNumbers}
            />

            <button type="button" onClick={this.addLine}>
              Add Line
            </button>

            <button type="button" onClick={this.lineNumbers}>
              Submit
            </button>
          </div>
        </div>

        <SkidContents
          title={Object.keys(SkidDescriptors)}
          linesNeeded={this.state.lines}
          skidObjectsArr={this.state.skid}
          hide={this.state.showSkidHeader}
          numberChange={this.numberOnChange}
          itemChange={this.updateSkidItem}
          removeChange={this.removeLine}
        />

        <div
          id="final_buttons"
          style={
            this.state.numberOfLinesSubmitClicked &&
            this.state.deleteMessage === false
              ? { display: "" }
              : { display: "none" }
          }
        >
          <button
            id="final_submit"
            type="submit"
            style={
              this.state.numberOfLinesSubmitClicked
                ? { display: "" }
                : { display: "none" }
            }
            onClick={this.updateSkid}
          >
            Submit
          </button>

          <button
            id="send"
            type="submit"
            style={this.state.clicked ? { display: "" } : { display: "none" }}
            onClick={this.finalSubmit}
          >
            Save
          </button>
          <br />
          <button
            id="delete"
            type="submit"
            style={this.state.clicked ? { display: "" } : { display: "none" }}
            onClick={this.showDeleteMessage}
          >
            Delete All
          </button>
        </div>

        <ValidateRemoval
          deleteClick={this.deleteAll}
          showMessage={this.state.deleteMessage}
          noDelete={this.hideDeleteMessage}
        />
      </div>
    );
  }
}

//This will dynamically render all of the elements needed for the shipping to and from.
const ShippingToFrom = (props) => {
  let names = props.title;

  let elements = names.map((x, y) => {
    return (
      <div className="input_field" key={x + y.toString()}>
        <label id={props.toFrom + x}>{x}</label>
        <input
          id={props.toFrom + x}
          className={props.toFrom}
          placeHolder={x}
          type={x === "phone" ? "tel" : "text"}
          onChange={(e) => props.handleChange(e)}
          onClick={props.handleClick}
          value={returnValue(props.itemValue[x])}
        ></input>
      </div>
    );
  });

  return (
    <div id={props.divId} className={props.itemClass}>
      <h2>{props.header}</h2>
      <hr />
      {elements}
    </div>
  );
};

const PoInput = (props) => {
  return (
    <div className="po_inputs">
      <label>{props.labelName}</label>
      <input
        id={props.dataID}
        type={props.differentType ? props.differentType : "text"}
        placeHolder={props.placeholderText ? props.placeholderText : ""}
        onChange={props.handleOnChange}
        value={returnValue(props.itemValue)}
      ></input>
    </div>
  );
};

const PackType = (props) => {
  const options = ["Bulk", "Poly'd", "Rolls"];

  const optionInputs = options.map((x, y) => {

    if (props.unitType === x){
      return (
        <>
        <input
          key={`pack_option_${x}`}
          className="pack_option"
          onChange={props.changeHandler}
          type="radio"
          name="pack_unit"
          value={x}
          checked
        />

        <label key={`pack_option_label_${y}`} htmlFor={x}>
          {x}
        </label>
      </>
      )
    } else {
    return (
      <>
        <input
          key={`pack_option_${x}`}
          className="pack_option"
          onChange={props.changeHandler}
          type="radio"
          name="pack_unit"
          value={x}
        />

        <label key={`pack_option_label_${y}`} htmlFor={x}>
          {x}
        </label>
      </>
    );
    }
  });

  return (
    <div id="pack_option_parent">
      <p>Pack Type</p>
      {optionInputs}
    </div>
  );
};

const SkidContents = (props) => {
  const newInput = props.title;
  const elements = newInput.map((x, y) => {
    return (
      <th
        style={props.hide ? { display: "" } : { display: "none" }}
        key={"header" + x}
        id={`${x}_header`}
        className="table_header"
      >
        {x}
      </th>
    );
  });

  let rows = props.linesNeeded;
  let i = 0;

  let skidItems = [];
  while (i < rows) {
    i++;
    skidItems.push(i);
  }

  const newColumns = (number) =>
    newInput.map((x, y) => {
      return (
        <td
          id={"column_num" + y}
          className="column_data"
          key={"column_num" + y}
        >
          <input
            id={`${props.title[y]}${number}`}
            className={Object.keys(SkidDescriptors)[y]}
            onChange={
              Object.keys(SkidDescriptors)[y] !== "itemDescription"
                ? props.numberChange
                : props.itemChange
            }
            value={
              number < props.skidObjectsArr.length
                ? props.skidObjectsArr[number][x]
                : null
            }
          ></input>
        </td>
      );
    });

  const newRows = skidItems.map((x, y) => {
    return (
      <tr id={`row_num ${y}`} className="line_data" key={`row_num ${y}`}>
        {newColumns(y)}
        <button
          id={"remove" + y}
          className="remove_button"
          type="button"
          onClick={props.removeChange}
        >
          Remove
        </button>
      </tr>
    );
  });

  return (
    <table
      id="main_table"
      style={props.hide ? { display: "" } : { display: "none" }}
    >
      <tbody>
        <tr id="header_row">{elements}</tr>
        {newRows}
      </tbody>
    </table>
  );
};

const ValidateRemoval = (props) => {
  return (
    <div
      id="validate_removal"
      style={props.showMessage === true ? { display: "" } : { display: "none" }}
    >
      <p>Are you sure that you would like to delete this document?</p>
      <button onClick={props.deleteClick}>Yes</button>
      <button onClick={props.noDelete}>No</button>
    </div>
  );
};

export default ParentShippingCreator;
