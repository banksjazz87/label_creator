import * as React from 'react'
import "../assets/options.scss"
import "../assets/library.scss"
import postData from "../functions/postRequest.js"
import serverCall from "../functions/serverCall.js"


const searchSelections = ["Select One", "Company", "Job", "PO", "Date"];

class OptionsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            search: false,
            new: false,
            searchBy: "",
            searchText: "",
            display: 'flex',
            searchResults: "", 
            searchDataSent: false, 
            selectPreviousClicked: false
            
        }

        this.choiceClick = this.choiceClick.bind(this);
        this.optionSelection = this.optionSelection.bind(this);
        this.searchInfo = this.searchInfo.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.selectPrevious = this.selectPrevious.bind(this);
    }

    choiceClick(e){
        e.preventDefault();

        const currentId = e.target.id;

        if(currentId === 'search'){
            this.setState({
                search: true,
                new: false,
                display: 'none'
            })
        }else{
            this.setState({
                search: false,
                new: true,
                display: 'none'
            })
        }
    }

    optionSelection(e){

        e.preventDefault();

        this.setState({
            searchBy: e.target.value
        })
    }

    searchInfo(e){
        e.preventDefault();

        this.setState({
            searchText: e.target.value
        })
    }

    searchClick(e){
      

        let url = '/options/data';

        let searchObject = {
            [this.state.searchBy]: this.state.searchText
        }


        postData(url, searchObject)
        /*.then(() => serverCall("http://localhost:4500" + url))
        .then(res => this.setState({
            searchResults: res
        }))*/

        .then(this.setState({
            searchDataSent: true
        }))
    }

    selectPrevious(e){
        e.preventDefault();

        serverCall("http://localhost:4500/options/data")
        .then(res => res.length === 0 ? alert('Invalid search query') : this.setState({
            searchResults: res,
            selectPreviousClicked: true
        }))

        
        console.log(this.state.searchResults);
    }



    render() {
        return(
            <div id="options_page_container">

                <h1 id="header_text">Welcome to the Label Creator <br/> Please Select an Option Below</h1> 

             <div id="button_container">
                <Choice idName="new"
                        clickHandler={this.choiceClick}
                        label="New" 
                        buttonClass="button"
                        currentDisplay={this.state.display}
                />
                <Choice idName="search"
                        clickHandler={this.choiceClick}
                        label="Search" 
                        buttonClass="button"
                        currentDisplay={this.state.display}
                />
            </div>

                <Options searching={this.state.search}
                         changeHandler={this.optionSelection}
                         arrayOfOptions={searchSelections}
                />
                <Input searchType={this.state.searchBy}
                       searching={this.state.search}
                       changeHandler={this.searchInfo}
                       clickHandler={this.searchClick}
                       buttonClass="button"
                />

                <SelectResult sent={this.state.searchDataSent}
                              query={this.state.searchBy}
                              searchDataResults={this.state.searchResults}
                              clickHandler={this.selectPrevious}
                              selectClicked={this.state.selectPreviousClicked}
                />

             
            </div>
        )
    }
}

const Choice = (props) => {
    return(
    <button id={props.idName}  
            className={props.buttonClass}                 
            type="button"
            onClick={props.clickHandler}
            style={{display: props.currentDisplay}}
    >
        {props.label}
    </button>
    )
}

const Options = (props) => {
    const allOptions = props.arrayOfOptions.map((x, y) => {
        return(
        <option id={x} 
                key={x + "_y"}
                >
        {x}
        </option>
    )
    })
    return(
        <select style={props.searching ? {display: "flex"} : {display: "none"}}
        onChange={props.changeHandler}>
            {allOptions}
        </select>
    )
}

const Input = (props) => {
    return(
        <form style={props.searchType.length === 0 ? {display: "none"} : {display: "flex"}}>
            <label>{props.searchType}</label>
            <input type="text"
               onChange={props.changeHandler}></input>
            <button type="button" onClick={props.clickHandler}
                className={props.buttonClass}>
                Search
            </button>
        </form>
    )
}


/*const OptionsFromSearchResults = () => {
    return(
        <option>Batman</option>
    )
}*/

const SelectResult = (props) => {
    
    
    const OptionsFromSearchResults = (props) => {

        if(props.searchDataResults.length > 0){
           const displayResults = props.searchDataResults.map((x, y) => {
                return(
                    <option key={y}>{`${x[props.query]}, ${x.company}`}</option>
                )

            })

            return displayResults;
        }
    }

    return(
        <select style={props.sent ? {display: "flex"} : {display: "none"}} onClick={props.clickHandler}>
            <option>Select From The Following</option>
            <OptionsFromSearchResults />
        </select>
    )
}

export default OptionsPage;