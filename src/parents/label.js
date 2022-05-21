import * as React from "react";
import "../assets/label.scss";
import "../assets/nav.scss";
import TextEdit from "../components/textEdit.js";

//userDataFromCreator used for development mode
import userDataFromCreator from "../variables/dummyData";
import PrintButton from "../components/printButton";
import serverCall from "../functions/serverCall";
import changeDateFormat from "../functions/dateFormat.js";

class ParentLabels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //switch fetched to true for development, false for production
      fetched: true,
      //switch userData to userDataFromCreator[0] for development and "" for production
      userData: userDataFromCreator[0],
      count: 0,
      showEditBox: false
    };

    this.incrementHandler = this.incrementHandler.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
  }

  //use this function only for production
  /*componentDidMount() {
    serverCall("/allData").then((items) =>
      this.setState({
        fetched: true,
        userData: items[0],
      })
    );
  }*/

  incrementHandler = (e) => {
    e.preventDefault();

    if (this.state.count === this.state.userData.skid.length - 1) {
      alert("All of the labels have been printed.");
    } else {
      this.setState((prevCount) => ({
        count: prevCount.count + 1,
      }));
    }
  };

  decrementHandler = (e) => {
    e.preventDefault();

    if (this.state.count > 0) {
      this.setState((prevCount) => ({
        count: prevCount.count - 1,
      }));
    } else {
      alert("You are currently on the first label");
    }
  };
  render() {
    if (this.state.fetched) {
      return (
        <div>
          <p id="labels_needed">{`Print ${
            this.state.userData.skid[this.state.count].numOfCartons
          }`}</p>

          <div id="label_container">
            <TopHeading
              job={this.state.userData.Job}
              shipTo={this.state.userData.shipTo.company}
            />

            <LabelMiddle
              description={
                this.state.userData.skid[this.state.count].itemDescription
              }
            />

            <TextEdit 
              show={this.state.showEditBox}
            />

            <LabelBottom
              attention={this.state.userData.shipTo.attention}
              purchaseOrder={this.state.userData.PO}
              packs={this.state.userData.skid[this.state.count].packsRolls}
              unitType={this.state.userData.packageUnit}
              quantityPerCarton={
                this.state.userData.skid[this.state.count].qtyPerCarton
              }
              date={changeDateFormat(this.state.userData.date)}
            />
          </div>

          <div id="label_buttons_container">
            <Button
              id="previous_button"
              clickHandler={this.decrementHandler}
              text="Previous"
            />

            <PrintButton />

            <Button
              id="next_button"
              clickHandler={this.incrementHandler}
              text="Next"
            />
          </div>
        </div>
      );
    } else {
      return <h1>Fetching</h1>;
    }
  }
}

const TopHeading = (props) => {
  return (
    <div id="top_of_label" class="label_content">
      <p id="job">{`Job# ${props.job}`}</p>
      <p id="company_name">{props.shipTo}</p>
    </div>
  );
};

const LabelMiddle = (props) => {
  return (
    <div id="middle_label" class="label_content">
      <p id="description">{props.description}</p>
    </div>
  );
};

const LabelBottom = (props) => {
  return (
    <div id="bottom_label" class="label_content">
      <p
        id="attention"
        style={
          props.attention.length > 0 ? { display: "" } : { display: "none" }
        }
      >
        {`Attention: ${props.attention}`}
      </p>
      <p id="purchase_order">{`PO#: ${props.purchaseOrder}`}</p>
      <p id="packs_rolls">{`${props.unitType} @ ${props.packs}`}</p>
      <p id="qtyPerCarton">{`Quantity= ${props.quantityPerCarton}`}</p>
      <p id="date">{`Date: ${props.date}`}</p>
    </div>
  );
};

const Button = (props) => {
  return (
    <button className="label_buttons" onClick={props.clickHandler}>
      {props.text}
    </button>
  );
};

export default ParentLabels;
