import * as React from "react";
import "../App.css";

function ParentShippingCreator() {
  return (
    <div>
      <h1> Shipping Creator </h1>
      <p> This is where we will create all of the various labels and slips </p>
      <InputData />
      <UserInfo />
    </div>
  );
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
