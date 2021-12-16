import * as React from "react";
import "../App.css";

//async function using fetch to retrieve the data from the server
const serverCall = async () => {
  const response = await fetch(
    "http://localhost:4500/allData"
  );

  try {
    let updatedRes = await response.json();
    console.log(updatedRes);
  } catch (e) {
    console.log("error", e);
  }
};

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
    serverCall();
  }
  render() {
    return (
      <div>
        <TestText />
        <button type='button' onClick={serverCall}>Click for Data</button>
      </div>
    );
  }
}

export default ParentPackSlip;
