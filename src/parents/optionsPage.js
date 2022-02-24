import * as React from 'react'
import "../assets/options.scss"
import "../assets/library.scss"

const searchSelections = ["Select One", "Company", "Job#", "PO#", "Date"];

class OptionsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            search: false,
            new: false,
            searchBy: ""
        }

        this.choiceClick = this.choiceClick.bind(this);
        this.optionSelection = this.optionSelection.bind(this);
    }

    choiceClick(e){
        e.preventDefault();

        const currentId = e.target.id;

        if(currentId === 'search'){
            this.setState({
                search: true,
                new: false
            })
        }else{
            this.setState({
                search: false,
                new: true
            })
        }
    }

    optionSelection(e){

        e.preventDefault();

        this.setState({
            searchBy: e.target.value
        })
    }

    render() {
        return(
            <div id="options_page_container">

                <h1 id="header_text">Welcome to the Label Creator <br/> Please Select an Option Below</h1> 

             <div id="button_container">
                <Choice idName="new"
                        clickHandler={this.choiceClick}
                        label="New" 
                        className="button"
                />
                <Choice idName="search"
                        clickHandler={this.choiceClick}
                        label="Search" 
                        className="button"
                />
            </div>

                <Options searching={this.state.search}
                         changeHandler={this.optionSelection}
                />
                <Input searchType={this.state.searchBy}
                       searching={this.state.search}
                />
             
            </div>
        )
    }
}

const Choice = (props) => {
    return(
    <button id={props.idName}                   
            type="button"
            onClick={props.clickHandler}
    >
        {props.label}
    </button>
    )
}

const Options = (props) => {
    const allOptions = searchSelections.map((x, y) => {
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
        <input type="text"></input>
        </form>
    )
}

export default OptionsPage;