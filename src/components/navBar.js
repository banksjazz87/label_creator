import * as React from "react";
import { Link } from "react-router-dom";
import "../assets/nav.scss"

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: false
    }

    this.showHide = this.showHide.bind(this);
    
  }

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

    console.log(this.state.display);
  }
  render(){
  return (
    <div>
    <MenuButton />
    <nav id="navbar">
      <Link to="/shipping_creator">Shipping Create Docs</Link>
      <Link to="/pack_slip">Pack Slip</Link>
      <Link to="/labels">Lables</Link>
      <Link to="/ship_to_papers">Ship To Slip</Link>
    </nav>
    </div>
  )};
}

const MenuButton = () => {
    return(
        <div id="hamburger_icon">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    )
}

export default Nav;