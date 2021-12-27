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
    date: "12/28/2021"
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
        <TopHeading 
          job={this.state.userData.Job}
          shipFrom={this.state.userData.shipFrom.company}
        />
       
        <LabelBottom
          attention={this.state.userData.shipTo.attention}
          purchaseOrder={this.state.userData.PO}
          packs={this.state.userData.skid[this.state.increment].packsRolls}
          quantityPerCarton={this.state.userData.skid[this.state.increment].qtyPerCarton}
          date={this.state.userData.date}
        />
      </div>
    );
  }
}

const TopHeading = (props) => {
  return(
    <div id="top_of_label">
      <p id="job">{`Job# ${props.job}`}</p>
      <p id="company_name">{props.shipFrom}</p>
    </div>
  )
}

const LabelBottom = (props) => {
  return(
    <div id="bottom_label">
      <p id="attention">{`Attention: ${props.attention}`}</p>
      <p id="purchase_order">{`PO#: ${props.purchaseOrder}`}</p>
      <p id="packs_rolls">{`Poly'd/Rolls @ ${props.packs}`}</p>
      <p id="qtyPerCarton">{`Quantity= ${props.quantityPerCarton}`}</p>
      <p id="date">{`Date: ${props.date}`}</p>
    </div>
  )
}

export default ParentLabels;
