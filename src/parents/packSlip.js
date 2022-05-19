import * as React from "react";
import "../assets/packSlip.scss";
import "../assets/nav.scss";
import TextEdit from "../components/textEdit.js";

//userDataFromCreator for development only
//import userDataFromCreator from "../variables/dummyData"

import MathFunctions from "../functions/mathFunctions.js";
import serverCall from "../functions/serverCall";
import changeDateFormat from "../functions/dateFormat.js";

class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);

    //The code listed below is just for the DEVELOPMENT mode
    this.state = {
      //switch fetched to true for development, false for production
      fetched: false,
      //switch userData to userDataFromCreator[0] for development and "" for production
      userData: "",
      showEditBox: false,
      editContent: "",
      editItem: ""
    };
  

this.showEdit = this.showEdit.bind(this);
this.cancelEdit = this.cancelEdit.bind(this);
this.editChange = this.editChange.bind(this);
}

  //used for PRODUCTION mode, only
  componentDidMount() {
    serverCall("/allData").then((items) =>
      this.setState({
        userData: items[0],
        fetched: true,
      })
    );
  }

showEdit(e){
  e.preventDefault();

  this.setState({
    showEditBox: true,
    editContent: e.target.textContent,
    editItem: e.target.id 
  })

  console.log('id = ' +  e.target.id);
  console.log('text = ' + e.target.textContent)
}

cancelEdit(e){
  e.preventDefault();
  this.setState({
    showEditBox: false
  })
}

editChange(e){
  this.setState({
    editContent: e.target.value
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
          <p id="po_num">{`PO#: ${this.state.userData["PO"]}`}</p>
          <div id="table_container">
            <JobNum
              job={this.state.userData["Job"]}
              date={changeDateFormat(this.state.userData.date)}
            />

            <TextEdit 
              show={this.state.showEditBox}
              cancelOnClick={this.cancelEdit}
              text={this.state.editContent}
              textChange={this.editChange}
            />
            <MainTable
              items={this.state.userData["skid"]}
              unitType={this.state.userData["packageUnit"]}
              totalCartons={this.state.userData["totalCartons"]}
              total={this.state.userData["totalQty"]}

              handleOnClick={this.showEdit}
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
  /**
   *
   * @param {*} arr
   * @param {*} itemNum
   * @returns text for the cartonText field.
   */
  const skidText = (arr, itemNum) => {
    let text = "";

    arr[itemNum].numOfCartons > 1
      ? (text = `${arr[itemNum].numOfCartons} Cartons @ ${arr[itemNum].qtyPerCarton} (${props.unitType} @ ${arr[itemNum].packsRolls})`)
      : (text = `${arr[itemNum].numOfCartons} Carton @ ${arr[itemNum].qtyPerCarton} (${props.unitType} @ ${arr[itemNum].packsRolls})`);

    return text;
  };

  /**
   *
   * @returns an array of objects with a cartonText field added to it. All duplicate items with the same name are conoslidated to one object.
   */
  const checkForDuplicateItems = () => {
    let newArr = props.items;

    for (let i = 0; i < newArr.length; i++) {
      if (
        newArr[i + 1] &&
        newArr[i + 1].itemDescription === newArr[i].itemDescription
      ) {
        while (newArr[i].itemDescription === newArr[i + 1].itemDescription) {
          newArr[i].cartonText =
            skidText(newArr, i) + " " + skidText(newArr, i + 1);

          let sum =
            MathFunctions.numOrNot(newArr[i].qtyShipped) +
            MathFunctions.numOrNot(newArr[i + 1].qtyShipped);

          newArr[i].qtyShipped = MathFunctions.commaPlacer(sum);

          newArr.splice(i + 1, 1);
        }
      } else {
        newArr[i].cartonText = skidText(newArr, i);
      }
    }

    return newArr;
  };

  const noDuplicates = checkForDuplicateItems();

  //This method will return an array of 8 elements, if the array that is being checked contains fewer than 8.
  const moreLines = (checkedArr) => {
    if (checkedArr.length < 8) {
      const finalArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      return finalArr;
    } else {
      return checkedArr;
    }
  };

  const linesArr = moreLines(noDuplicates);

  const menuItems = linesArr.map((x, y) => {
    if (y < noDuplicates.length) {
      return (
        <>
          <tr key={"row" + y} id="description_row">
            <td 
              id="qty_needed" 
              class="item_info qty" 
            >
              {noDuplicates[y].qtyNeeded}
            </td>
            <td id="item_description" class="item_info">
              {noDuplicates[y].itemDescription}
            </td>
            <td id="qty_shipped" class="item_info qty">
              {noDuplicates[y].qtyShipped}
            </td>
          </tr>
          <tr key={"description" + y}>
            <td></td>
            <td 
              id={`item_info_y`} 
              class="item_info" 
              onDoubleClick={props.handleOnClick}
            >
              {noDuplicates[y].cartonText}</td>
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
              onDoubelClick={props.handleOnClick}></td>
            <td id="qty_shipped"></td>
          </tr>
          <tr key={"description" + y} id="blank_white_row">
            <td></td>
            <td class="item_info"></td>
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
