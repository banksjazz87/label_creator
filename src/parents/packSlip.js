import * as React from "react";
import "../assets/packSlip.scss";
import "../assets/nav.scss";
import TextEdit from "../components/textEdit.js";

//userDataFromCreator for development only
//import userDataFromCreator from "../variables/dummyData"

import serverCall from "../functions/serverCall";
import changeDateFormat from "../functions/dateFormat.js";
import NoDuplicates from "../functions/removeDuplicates.js";


class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);

    //The code listed below is just for the DEVELOPMENT mode
    this.state = {
      //switch fetched to true for development, false for production
      fetched: false,

      //switch userData to userDataFromCreator[0] for development and "" for production
      userData: "",

      /*for developmnet switch skidInfo to 
      NoDuplicates.checkForDuplicateItems(userDataFromCreator[0]['skid'], userDataFromCreator[0])
      
      for production switch skidInfo to ""
      */
      skidInfo: "",
    };

    this.showEdit = this.showEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editChange = this.editChange.bind(this);
    this.confirmChange = this.confirmChange.bind(this);
  }

  //used for PRODUCTION mode, only
  componentDidMount() {
    serverCall("/allData").then((items) =>
      this.setState({
        userData: items[0],
        fetched: true,
        skidInfo: NoDuplicates.checkForDuplicateItems(
          items[0]["skid"],
          items[0]
        ),
      })
    );
  }

  showEdit(e) {
    e.preventDefault();
    console.log("cat");
    this.setState({
      showEditBox: true,
      editContent: e.target.textContent,
      editItem: e.target.id,
    });
  }

  cancelEdit(e) {
    e.preventDefault();
    this.setState({
      showEditBox: false,
    });
  }

  editChange(e) {
    this.setState({
      editContent: e.target.value,
    });
  }

  confirmChange(e) {
    e.preventDefault();
    const changedElement = document.getElementById(this.state.editItem);
    changedElement.textContent = this.state.editContent;

    this.setState({
      showEditBox: false
    })
  }

  render() {
    if (this.state.fetched === true) {
      return (
        <div id="container">
          <h1 id="packing_slip_header">Packing Slip</h1>
          <Address
            id="ship_from"
            from={true}
            items={this.state.userData["shipFrom"]}
          />
          <Address
            id="ship_to"
            from={false}
            items={this.state.userData["shipTo"]}
          />

          <TextEdit
            show={this.state.showEditBox}
            cancelOnClick={this.cancelEdit}
            text={this.state.editContent}
            textChange={this.editChange}
            makeChange={this.confirmChange}
          />
          <p id="po_num">{`PO#: ${this.state.userData["PO"]}`}</p>

          <div id="table_container">
            <JobNum
              job={this.state.userData["Job"]}
              date={changeDateFormat(this.state.userData.date)}
            />
            <MainTable
              items={this.state.skidInfo}
              handleOnClick={this.showEdit}
              total={this.state.userData.totalQty}
              totalCartons={this.state.userData.totalCartons}
            />
          </div>

          <ThankYou phone={this.state.userData["shipFrom"]["phone"]} />
        </div>
      );
    } else {
      return <h1>Fetching currently</h1>;
    }
  }
}

const Address = (props) => {
  return (
    <div className={props.id}>
      <p>{props.items.company}</p>
      <p>{props.items.street}</p>
      <p>{`${props.items.city}, ${props.items.state} ${props.items.zip}`}</p>
      {props.items.attention ? (
        <p>{"Attention: " + props.items.attention}</p>
      ) : null}
    </div>
  );
};

const JobNum = (props) => {
  return (
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
        <td>{props.job}</td>
      </tr>
    </table>
  );
};

const MainTable = (props) => {
  //This method will return an array of 8 elements, if the array that is being checked contains fewer than 8.
  const moreLines = (checkedArr) => {
    if (checkedArr.length < 8) {
      const finalArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      return finalArr;
    } else {
      return checkedArr;
    }
  };

  const linesArr = moreLines(props.items);

  const menuItems = linesArr.map((x, y) => {
    if (y < props.items.length) {
      return (
        <>
          <tr key={"row" + y} id="description_row">
            <td id="qty_needed" class="item_info qty">
              {props.items[y].qtyNeeded}
            </td>
            <td id="item_description" class="item_info">
              {props.items[y].itemDescription}
            </td>
            <td id="qty_shipped" class="item_info qty">
              {props.items[y].qtyShipped}
            </td>
          </tr>
          <tr key={"description" + y}>
            <td></td>
            <td id={`item_info_${y}`} class="item_info"
            onDoubleClick={props.handleOnClick}>
              {props.items[y].cartonText}
            </td>
          </tr>
          <td></td>
        </>
      );
    } else {
      return (
        <>
          <tr key={"row" + y} id="blank_description_row" className="blank_row">
            <td id="qty_needed"></td>
            <td 
              id={`item_description_${y}`}
              onDoubleClick={props.handleOnClick}
            > 
            </td>
            <td id="qty_shipped"></td>
          </tr>
          <tr key={"description" + y} id="blank_white_row">
            <td></td>
            <td 
              id={`blank_white_${y}`} class="item_info"
              onDoubleClick={props.handleOnClick}
              ></td>
          </tr>
          <td></td>
        </>
      );
    }
  });
  return (
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
  );
};

const ThankYou = (props) => {
  return (
    <p id="thank_you_text">
      {`Please contact Accounts Receivable (${props.phone}) with any questions or concerns`}
      <br />
      <b>Thank you for your business!</b>
    </p>
  );
};

export default ParentPackSlip;
