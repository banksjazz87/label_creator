import * as React from "react";
import "../assets/options.scss";
import "../assets/library.scss";
import postData from "../functions/postRequest.js";
import serverCall from "../functions/serverCall.js";
import { Link } from "react-router-dom";
import MathFunctions from "../functions/mathFunctions";

const searchSelections = ["Select One", "Company", "Job", "PO", "Date"];

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: false,
      new: false,
      searchBy: "",
      searchText: "",
      display: "flex",
      searchResults: "",
      searchDataSent: false,
      selectPreviousClicked: false,
      selectedResults: "",
      dataSelectionMade: false,
    };

    this.choiceClick = this.choiceClick.bind(this);
    this.optionSelection = this.optionSelection.bind(this);
    this.searchInfo = this.searchInfo.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this.updateSelectedResults = this.updateSelectedResults.bind(this);
    this.sendSelectedData = this.sendSelectedData.bind(this);
  }

  choiceClick(e) {
    e.preventDefault();
    const currentId = e.target.id;
    if (currentId === "search") {
      this.setState({
        search: true,
        new: false,
        display: "none",
      });
    } else {
      this.setState({
        search: false,
        new: true,
        display: "none",
      });
    }
  }

  optionSelection(e) {
    e.preventDefault();
    this.setState({
      searchBy: e.target.value,
    });
  }

  searchInfo(e) {
    e.preventDefault();
    this.setState({
      searchText: e.target.value,
    });
  }

  searchClick(e) {
    let url = "/options/data";
    let searchObject = {
      [this.state.searchBy]: this.state.searchText,
    };
    postData(url, searchObject).then(
      this.setState({
        searchDataSent: true,
      })
    );
  }

  selectPrevious(e) {
    e.preventDefault();
    serverCall("/options/data").then((res) =>
      res.length === 0
        ? alert("Invalid search query")
        : this.setState({
            searchResults: res,
            selectPreviousClicked: true,
          })
    );
    console.log(this.state.searchResults);
  }

  updateSelectedResults(e) {
    e.preventDefault();
    let selectedValue = e.target.value;
    this.setState({
      selectedResults:
        this.state.searchResults[
          MathFunctions.allBeginningNumbers(selectedValue) - 1
        ],
      dataSelectionMade: true,
    });
  }

  sendSelectedData(e) {
    e.preventDefault();
    const url = "/chosen/data";
    postData(url, this.state.selectedResults);
    sessionStorage.setItem("revising", true);
  }

  render() {
    return (
      <div id="options_page_container">
        <h1 id="header_text">Welcome </h1>
        <p id="search_or_new_text"
            style={this.state.search ? {display: 'none'} : {display: ''}}>
          Would you like to create a new document or search for a previous one?
        </p>

        <div id="button_container">
          <Choice
            idName="new"
            linkName="link"
            clickHandler={this.choiceClick}
            label="New"
            buttonClass="button"
            currentDisplay={this.state.display}
          />
          <Choice
            idName="search"
            clickHandler={this.choiceClick}
            label="Search"
            buttonClass="button"
            currentDisplay={this.state.display}
          />
        </div>

        <div id="active_input_options">
        <Options
          searching={this.state.search}
          changeHandler={this.optionSelection}
          arrayOfOptions={searchSelections}
        />
        <Input
          searchType={this.state.searchBy}
          searching={this.state.search}
          changeHandler={this.searchInfo}
          clickHandler={this.searchClick}
          buttonClass="button"
        />
        <SelectResult
          sent={this.state.searchDataSent}
          query={this.state.searchBy}
          searchDataResults={this.state.searchResults}
          clickHandler={this.selectPrevious}
          selectClicked={this.state.selectPreviousClicked}
          changeHandler={this.updateSelectedResults}
        />

        <button
          id="selected_option_submit"
          className="button"
          type="submit"
          onClick={this.sendSelectedData}
          style={
            this.state.dataSelectionMade
              ? { display: "flex" }
              : { display: "none" }
          }
        >
          <Link className="link" to="/creator_page">
            Submit
          </Link>
        </button>
        </div>
      </div>
    );
  }
}

const Choice = (props) => {
  if (props.idName === "new") {
    return (
     <button
        id={props.idName}
        type="button"
        className={props.buttonClass}
        onClick={props.clickHandler}
        style={{ display: props.currentDisplay }}
      >
        <Link
          to="/creator_page"
          className={props.linkName}
        >
          {props.label}
        </Link>
      </button>
    );
  } else {
    return (
      <button
        id={props.idName}
        className={props.buttonClass}
        type="button"
        onClick={props.clickHandler}
        style={{ display: props.currentDisplay }}
      >
        {props.label}
      </button>
    );
  }
};

const Options = (props) => {
  const allOptions = props.arrayOfOptions.map((x, y) => {
    return (
      <option id={x} key={x + "_y"}>
        {x}
      </option>
    );
  });
  return (
    <select
      className="select_option"
      style={props.searching ? { display: "flex" } : { display: "none" }}
      onChange={props.changeHandler}
    >
      {allOptions}
    </select>
  );
};

const Input = (props) => {
  return (
    <form
      id="search_by"
      style={
        props.searchType.length === 0
          ? { display: "none" }
          : { display: "flex" }
      }
    >
    <div className="label_and_input">
      <label>{props.searchType}</label>
      <input type="text" onChange={props.changeHandler}></input>
    </div>
      <button
        type="button"
        onClick={props.clickHandler}
        className={props.buttonClass}
      >
        Search
      </button>
    </form>
  );
};

const SelectResult = (props) => {
  const optionsFromSearchResults = (arr, searchedItem) => {
    const displayResults = arr.map((x, y) => {
      return (
        <option id={`option${y}`} key={y}>
          {`${y + 1}. ${x[searchedItem]}, ${x.shipTo.company}`}
        </option>
      );
    });
    return displayResults;
  };

  return (
    <select
      className="select_option"
      style={props.sent ? { display: "flex" } : { display: "none" }}
      onClick={props.clickHandler}
      onChange={props.changeHandler}
    >
      <option>Select From The Following</option>
      {props.selectClicked
        ? optionsFromSearchResults(props.searchDataResults, props.query)
        : ""}
    </select>
  );
};

export default OptionsPage;
