import * as React from 'react'

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
                <Choice idName="new"
                        clickHandler={this.choiceClick}
                        label="New" 
                />
                <Choice idName="search"
                        clickHandler={this.choiceClick}
                        label="Search" 
                />

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