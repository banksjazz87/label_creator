import * as React from "react";
import { Link } from "react-router-dom";
import "../assets/nav.scss"

const linkStyles = {
    textDecoration: 'none', 
    fontSize: '1.5em', 
    color: 'white',
    textShadow: '.5px 1px #494949'
}

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: false,
      width: 0
    }

    this.showHide = this.showHide.bind(this);
    this.displayMenu = this.displayMenu.bind(this);
    
  }

  
  //A function that will update how the navbar should be displayed, and the rate in which it should do so.

  displayMenu = () => {
      setInterval(() => {
          if(this.state.width < 100 && this.state.display){
              this.setState((state) => ({
                  width: state.width + 1
              }))
              console.log('width = ', this.state.width);

              }else if(this.state.width > 0 && this.state.display === false){
              this.setState((state) => ({
                width: state.width -1
              }))

              console.log('width = ', this.state.width);
          }else{
              clearInterval(this.displayMenu);
              }
          }, 2);
  }

 

  //A function that updates the state, whether the navbar should be displayed, or not.
  showHide = (e) => {
    e.preventDefault();

    if(this.state.display){
      this.setState({
        display: false
      })
      

    }else{

      this.setState({
        display: true
      })
    }
    this.displayMenu();
  }

  render(){
  return (
    <div>
    <MenuButton clickHandler={this.showHide}/>
    <nav id="navbar" 
        style={this.state.display ? 
        {display:"flex", height: "100vh", width:`${this.state.width}vw`} 
        : this.state.width > 0 ? 
        {display: "flex", height: "100vh", width: `${this.state.width}vw`} 
        : {display: "none"}}>

      <Link to="/shipping_creator" style={linkStyles}>Shipping Create Docs</Link>
      <Link to="/pack_slip" style={linkStyles}>Pack Slip</Link>
      <Link to="/labels" style={linkStyles}>Lables</Link>
      <Link to="/ship_to_papers" style={linkStyles}>Ship To Slip</Link>
    </nav>
    </div>
  )};
}

const MenuButton = (props) => {
    return(
        <div id="hamburger_icon" onClick={props.clickHandler}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    )
}

export default Nav;