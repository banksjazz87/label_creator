import * as React from "react";
import "../assets/shipTo.scss";
import "../assets/nav.scss";
import userDataFromCreator from "../variables/dummyData"
//import serverCall from "../functions/serverCall"

class ParentShipTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //switch fectched to true for developoment, false for production
      fetched: true,
      //switch userData to userDataFromCreator[0] for development and "" for production
      userData: userDataFromCreator[0],
    };
  }

  //use this function only for production
  /*componentDidMount(){
    serverCall()
    .then(items => this.setState({
        fetched: true,
        userData: items[0]
      }))
  }*/


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
