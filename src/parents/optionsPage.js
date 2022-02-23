import * as React from 'react'
import "../assets/options.scss"
import "../assets/library.scss"
class OptionsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            search: false,
            new: false
        }

        this.choiceClick = this.choiceClick.bind(this);
    }

    choiceClick(e){
        e.preventDefault();

        const currentId = e.target.id;

        if(currentId === 'search'){
            this.setState({
                search: true
            })
        }else{
            this.setState({
                new: true
            })
        }
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

            </div>
        )
    }
}

const Choice = (props) => {
    return(
    <button id={props.idName} type="button">{props.label}</button>
    )
}

export default OptionsPage;