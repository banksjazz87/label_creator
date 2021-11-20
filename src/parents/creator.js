import * as React from "react";
import "../App.css";

const UserData = {
  shipFrom: {
    company: "",
    street: "",
    city: "", 
    state: "",
    zip: "", 
  },

  shipTo: {
    company: "",
    street: "",
    city: "", 
    state: "",
    zip: "", 
    attention: ""
  }
}


function ParentShippingCreator() {
  return (
    <div>
      <h1> Shipping Creator </h1>
      <p> This is where we will create all of the various labels and slips </p>
      <ShippingToFrom title={Object.keys(UserData.shipFrom)} />
      <ShippingToFrom title={Object.keys(UserData.shipTo)} />
      <InputData />
      <UserInfo />
    </div>
  );
}

//This will dynamically render all of the elements needed for the shipping to and from.
const ShippingToFrom = (props) => {
  
  let names = props.title;

  let elements = names.map((x, y) => {
   return(
  <div key={x + y.toString()}>
    <label id={props.toFrom + x}>{x}</label>
    <input type="text" placeholder={x}></input>
  </div>
   )
  })

  return (
    <div>
      {elements}
    </div>
  )

}
class InputData extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }

  }
  render(){
    return(
      <table>
        <tbody>
          <tr>
          <th>Shipping To</th>
          </tr>
        </tbody>
      </table>
    )
  }
}

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
    };
    this.currentInput = this.currentInput.bind("this");
  }

  currentInput = (e) => {
    this.setState({
      test: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <p> {this.state.test} </p>
        <input type="text" onChange={this.currentInput} />
      </div>
    );
  }
}

export default ParentShippingCreator;
