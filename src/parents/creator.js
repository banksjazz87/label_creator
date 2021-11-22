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


class ParentShippingCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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

    this.updateObj = this.updateObj.bind(this);
  }

  updateObj(e){
   
    const shipToOrFrom = e.target.className;
    const label = e.target.placeholder;

    this.setState({
      [shipToOrFrom]: {
      [label]: e.target.value
      }
  })
    console.log(this.state);
  }
  render(){
  return (
    <div>
      <h1> Shipping Creator </h1>
      <p> This is where we will create all of the various labels and slips </p>
      <ShippingToFrom toFrom={'shipFrom'} title={Object.keys(UserData.shipFrom)} handleChange={(e, key)=> this.updateObj(e, key)}  />
      <ShippingToFrom toFrom={"shipTo"} title={Object.keys(UserData.shipTo)} handleChange={(e, key) => this.updateObj(e, key)} />
      <InputData />
      <UserInfo />
    </div>
  );
}
}

//This will dynamically render all of the elements needed for the shipping to and from.
const ShippingToFrom = (props) => { 
  
  let names = props.title;

  let elements = names.map((x, y) => {
   return(
  <div key={x + y.toString()}>
    <label id={props.toFrom + x}>{x}</label>
    <input id={props.toFrom + x} className={props.toFrom} type="text" placeholder={x} onChange={(e) => props.handleChange(e)}></input>
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
