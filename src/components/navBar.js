import * as React from "react";
import { Link } from "react-router-dom";
import "../assets/nav.scss"


class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: false,
      width: 0
    }

    this.showHide = this.showHide.bind(this);
    this.retractMenu = this.retractMenu.bind(this);
    this.displayMenu = this.displayMenu.bind(this);
    
  }

  retractMenu = () => {
      setInterval(() => {
          if(this.state.width >= 0){
              this.setState((state) => ({
                width: state.width -1
              }))
          }else{
              clearInterval(this.retractMenu())
          }
      }, 1000);
  }

  displayMenu = () => {
      setInterval(() => {
          if(this.state.width < 100){
              this.setState((state) => ({
                  width: state.width + 1
              }))
              }else{
                  clearInterval(this.displayMenu())
              }
          }, 1000);
  }

 


  showHide = (e) => {
    e.preventDefault();

    if(this.state.display){
      this.setState({
        display: false
      })
      this.displayMenu();

    }else{
      this.setState({
        display: true
      })
      this.displayMenu();
    }

  }
  render(){
  return (
    <div>
    <MenuButton clickHandler={this.showHide}/>
    <nav id="navbar" style={this.state.display ? {display:"flex"} : {display:"none"}}>
      <Link to="/shipping_creator">Shipping Create Docs</Link>
      <Link to="/pack_slip">Pack Slip</Link>
      <Link to="/labels">Lables</Link>
      <Link to="/ship_to_papers">Ship To Slip</Link>
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