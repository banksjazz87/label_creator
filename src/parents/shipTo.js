import * as React from "react";
import "../assets/shipTo.scss";
import "../assets/nav.scss";
import TextEdit from "../components/textEdit.js";

//userDataFromCreator used for development
//import userDataFromCreator from "../variables/dummyData";

import PrintButton from "../components/printButton";
import serverCall from "../functions/serverCall";

class ParentShipTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //switch fectched to true for developoment, false for production
      fetched: false,
      //switch userData to userDataFromCreator[0] for development and "" for production
      userData: "",
      showEditBox: false
    };
  }

  //use this function only for production
  componentDidMount() {
    serverCall("/allData").then((items) =>
      this.setState({
        fetched: true,
        userData: items[0],
      })
    );
  }

  render() {
    if (this.state.fetched) {
      return (
        <div id="ship_to_container">
          <div id="ship_to_paper">
            <ShipToFrom
              toFrom="ship_from"
              items={this.state.userData.shipFrom}
            />

            <TextEdit 
              show={this.state.showEditBox}
            />
            <ShipToFrom 
              toFrom="ship_to" 
              items={this.state.userData.shipTo} 
            />
            <p id="pack_slip_po">{`PO#: ${this.state.userData.PO}`}</p>
          </div>
          <PrintButton />
        </div>
      );
    } else {
      return <h1>Fetching Data</h1>;
    }
  }
}

const ShipToFrom = (props) => {
  const checkForItem = () => {
    if (props.items.attention) {
      return <p style={{paddingTop: "24px"}}>{`ATTENTION: ${props.items.attention}`}</p>;
    }
  };

  return (
    <div id={props.toFrom}>
      <p>
        {props.toFrom === "ship_from" ? (
          <span style={{ fontSize: ".75em", marginLeft: "-4.7em" }}>
            Ship From:{" "}
          </span>
        ) : (
          <span style={{ fontSize: ".75em", marginLeft: "-3.7em"}}>
            Ship To:{" "}
          </span>
        )}
        {props.items.company}
      </p>
      <p>{props.items.street}</p>
      <p>{`${props.items.city}, ${props.items.state} ${props.items.zip}`}</p>
      {checkForItem("attention")}
    </div>
  );
};

export default ParentShipTo;
