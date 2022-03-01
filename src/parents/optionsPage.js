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
            searchDataSent: false
        }

        this.choiceClick = this.choiceClick.bind(this);
        this.optionSelection = this.optionSelection.bind(this);
        this.searchInfo = this.searchInfo.bind(this);
        this.searchClick = this.searchClick.bind(this);
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
        e.preventDefault();

        let url = '/options/data';

        let searchObject = {
            [this.state.searchBy]: this.state.searchText
        }


        postData(url, searchObject)

        .then(this.setState({
            searchDataSent: true
        }))

        console.log(this.state);
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

const SelectResult = (props) => {
    
   // const resArr = [];
    if(props.sent){
        serverCall("http:localhost:4500/options/data")
        .then(res => console.log(res))
    }
    
    /*const optionsFromResArr = resArr.map((x) => {
        return(
            <option>{`${x[props.query]}, ${x.company}`}</option>
        )
    })*/

    return(
        <select style={props.sent ? {display: "flex"} : {display: "none"}} onClick={() => console.log('clicked')}>
            <option>Select From The Following</option>
          
        </select>
    )
}

export default OptionsPage;