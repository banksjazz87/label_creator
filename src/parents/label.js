import * as React from "react";
import "../App.css";

//This is going to be dummy data used for DEVELOPMENT
//let userDataFromCreator;
let userDataFromCreator = [
  {
    shipFrom: {
      company: "Seneca Printing Express",
      street: "191 Howard Street",
      city: "Franklin",
      state: "PA",
      zip: "16323",
      phone: "814-671-2074",
    },

    shipTo: {
      company: "Chris Banks",
      street: "402 Myrtle Street",
      city: "Emlenton",
      state: "PA",
      zip: "16232",
      attention: "Chris",
    },

    skid: [
      {
        itemDescription: "Giorgio Whole Whites 16oz",
        qtyNeeded: "16,000",
        qtyShipped: "18,000",
        packsRolls: "1,000",
        qtyPerCarton: "16,000",
        numOfCartons: "2",
      },
      {
        itemDescription: "Giorgio Chopped Pieces 16oz",
        qtyNeeded: "32,000",
        qtyShipped: "36,000",
        packsRolls: "1,000",
        qtyPerCarton: "16,000",
        numOfCartons: "3",
      },
      {
        itemDescription: "Phillips Guans 16oz",
        qtyNeeded: "48,000",
        qtyShipped: "48,000",
        packsRolls: "1,000",
        qtyPerCarton: "16,000",
        numOfCartons: "3",
      },
      {
        itemDescription: "Giorgio Stems 16oz",
        qtyNeeded: "56,000",
        qtyShipped: "64,000",
        packsRolls: "1,000",
        qtyPerCarton: "16,000",
        numOfCartons: "4",
      },
    ],

    PO: "54791",
    Job: "176592",
  },
];

//Used in production mode
//async function using fetch to retrieve the data from the server
/*const serverCall = async () => {
  const response = await fetch(
    "http://localhost:4500/allData"
  );

  try {
    let updatedRes = await response.json();

    //this was commented out
    //userDataFromCreator = updatedRes;
    console.log(updatedRes);
    return updatedRes;

  } catch (e) {
    console.log("error", e);
  }
};*/

class ParentLabels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: true,
      userData: userDataFromCreator[0],
      increment: 0,
    };
  }
  render() {
    return (
      <div>
        <ParagraphCreator id="job" text={`Job# ${this.state.userData.Job}`} />
        <ParagraphCreator
          id="company_name"
          text={this.state.userData.shipFrom.company}
        />
        <ParagraphCreator
          id="attention"
          text={`Attention: ${this.state.userData.shipTo.attention}`}
        />
        <ParagraphCreator
          id="purchase_order"
          text={`PO#: ${this.state.userData.PO}`}
        />{" "}
      </div>
    );
  }
}

const ParagraphCreator = (props) => {
  return <p> {props.text} </p>;
};

export default ParentLabels;
