import * as React from "react";
import "../App.css";
import userDataFromCreator from "../variables/dummyData"

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

class ParentShipTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: true,
      userData: userDataFromCreator[0],
    };
  }

  render() {
    return( 
    <div>

      <ShipToFrom 
        toFrom="ship_from"
        items={this.state.userData.shipFrom}
      />

      <ShipToFrom
        toFrom="ship_to"
        items={this.state.userData.shipTo}
      />

      <p style={{fontSize: '32px'}}>{`PO#: ${this.state.userData.PO}`}</p>

      
    </div>
    )
  }
}

const ShipToFrom = (props) => {
  const checkForItem = () => {
    if(props.items.attention){
      return(
        <p>{`ATTENTION: ${props.items.attention}`}</p>
      )
    }
  }

  return (
    <div id={props.ship_from}>
      <p>{props.items.company}</p>
      <p>{props.items.street}</p>
      <p>{`${props.items.city}, ${props.items.state} ${props.items.zip}`}</p>
      {checkForItem('attention')}
    </div>
  )
}


export default ParentShipTo;
