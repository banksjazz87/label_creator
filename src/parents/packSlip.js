import * as React from "react";
import "../App.css";


//This is going to be dummy data used for development
let userDataFromCreator = [{
  shipFrom: {
    company: "Seneca Printing Express",
    street: "191 Howard Street",
    city: "Franklin", 
    state: "PA",
    zip: "16323", 
  },

  shipTo: {
    company: "Chris Banks",
    street: "402 Myrtle Street",
    city: "Emlenton", 
    state: "PA",
    zip: "16232", 
    attention: "Chris"
  }, 

  skid: [{
    itemDescription: "Giorgio Whole Whites 16oz",
    qtyNeeded: "16,000", 
    qtyShipped: "18,000", 
    packsRolls: "1,000", 
    qtyPerCarton: "16,000",
    numOfCartons: "2",
  }],

  PO: "54791", 
  Job: "176592"
}]
//async function using fetch to retrieve the data from the server
const serverCall = async () => {
  const response = await fetch(
    "http://localhost:4500/allData"
  );

  try {
    let updatedRes = await response.json();
    //userDataFromCreator = updatedRes;
    console.log(updatedRes);
  } catch (e) {
    console.log("error", e);
  }
};



class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);
    
    //Make This active before production
    //serverCall();
    
    this.state = {
      userData: userDataFromCreator[0]
    };
    console.log(this.state);
  }


  render() {
    return (
      <div>
        <h1>Packing Slip</h1>
      </div>
    );
  }
}

/*const Address = (data) => {
  return(

  )
}*/

export default ParentPackSlip;
