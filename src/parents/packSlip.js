import * as React from "react";
import "../App.css";

function TestText() {
  return (
    <div>
      <h1>This is the pack slip page</h1>
    </div>
  );
}

class ParentPackSlip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: "",
    };
  }
  componentDidMount() {
    //async function using fetch to retrieve the data from the server
    const serverCall = async () => {
      const response = await fetch(
        "http://localhost:4500/shipping_creator/data"
      );

      try {
        let updatedRes = await response.json();
        console.log(updatedRes);
      } catch (e) {
        console.log("error", e);
      }
    };

    serverCall();
  }
  render() {
    return (
      <div>
        <TestText />
      </div>
    );
  }
}

export default ParentPackSlip;
