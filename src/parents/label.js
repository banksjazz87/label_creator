import * as React from "react";
import "../assets/label.scss";
import "../assets/nav.scss"
import userDataFromCreator from "../variables/dummyData"
//import serverCall from "../functions/serverCall"


class ParentLabels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //switch fetched to true for development, false for production
      fetched: true,
      //switch userData to userDataFromCreator[0] for development and "" for production
      userData: userDataFromCreator[0],
      count: 0
    };

    this.incrementHandler = this.incrementHandler.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
  }

  //use this function only for production
 /* componentDidMount(){
    serverCall()
    .then(items => this.setState({
        fetched: true,
        userData: items[0]
      }))
  }*/

  incrementHandler = (e) => {
    e.preventDefault();

    if(this.state.count === this.state.userData.skid.length - 1){
      alert('All of the labels have been printed.')
  }else{
    this.setState((prevCount) => ({
      count: prevCount.count + 1
    }))
  }
  }

  decrementHandler = (e) => {
    e.preventDefault();

    if(this.state.count > 0){
      this.setState((prevCount) => ({
        count: prevCount.count -1
      }))
    }else{
      alert('You are currently on the first label');
    }
  }
  render() {
    if(this.state.fetched){
    return (
      <div>
        <p id="labels_needed">{`Print ${this.state.userData.skid[this.state.count].numOfCartons}`}</p>

      <div id="label_container">
        <TopHeading 
          job={this.state.userData.Job}
          shipFrom={this.state.userData.shipFrom.company}
        />

        <LabelMiddle
          description={this.state.userData.skid[this.state.count].itemDescription}
        />
       
        <LabelBottom
          attention={this.state.userData.shipTo.attention}
          purchaseOrder={this.state.userData.PO}
          packs={this.state.userData.skid[this.state.count].packsRolls}
          quantityPerCarton={this.state.userData.skid[this.state.count].qtyPerCarton}
          date={this.state.userData.date}
        />
      </div>

      <div id="label_buttons_container">
        <Button
          id="previous_button"
          clickHandler={this.decrementHandler}
          text="Previous"
        />
       
        <Button 
          id="next_button"
          clickHandler={this.incrementHandler}
          text="Next"
        />
      </div>
      </div>
    );
  }else{
    return(
      <h1>Fetching</h1>
    )
  }
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

const LabelMiddle = (props) => {
  return(
    <div id="middle_label">
      <p id="description">{props.description}</p>
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

const Button = (props) => {
  return(
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

export default ParentLabels;
