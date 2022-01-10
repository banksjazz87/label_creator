import * as React from "react";
import { Link } from "react-router-dom";
import "../assets/nav.scss"

const linkStyles = {
    textDecoration: 'none', 
    fontSize: '1.5em', 
    color: 'white',
    textShadow: '.5px 1px #494949'
}

const hoverLinkStyles = {
    textDecoration: 'none', 
    fontSize: '1.5em', 
    color: 'black',
    textShadow: '.5px 1px #494949'
 }

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: false,
      width: 0, 
      over: false,
      color: 'white'
    }

    this.showHide = this.showHide.bind(this);
    this.displayMenu = this.displayMenu.bind(this);
    this.mouseOverOption = this.mouseOverOption.bind(this);
    this.mouseLeaveOption = this.mouseLeaveOption.bind(this);
    
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

  //Mouse over option function, this will change the state of the boolean labeled as 'option'
  mouseOverOption = (e) => {
      e.preventDefault();
      e.target.setAttribute('style', "textDecoration: none; font-size: 1.5em; color: black; textShadow: .5pz 1px #494949");
  }

  mouseLeaveOption = (e) => {
      e.preventDefault();
      e.target.setAttribute('style', "textDecoration: none; font-size: 1.5em; color: white; textShadow: .5pz 1px #494949");
  }

  render(){
  return (
    <div>
    <MenuButton clickHandler={this.showHide}
                clicked={this.state.display}
    />
    <nav id="navbar" 
        style={this.state.display ? 
        {display:"flex", height: "100vh", width:`${this.state.width}vw`} 
        : this.state.width > 0 ? 
        {display: "flex", height: "100vh", width: `${this.state.width}vw`} 
        : {display: "none"}}>

     
      <Link to="/shipping_creator" 
        style={linkStyles} 
        onMouseOver={this.mouseOverOption}
        onMouseLeave={this.mouseLeaveOption}>
        Shipping Create Docs
      </Link>

      <Link to="/pack_slip" 
        style={linkStyles} 
        onMouseOver={this.mouseOverOption}
        onMouseLeave={this.mouseLeaveOption}>
        Pack Slip
     </Link>

      <Link to="/labels" 
        style={linkStyles} 
        onMouseOver={this.mouseOverOption}
        onMouseLeave={this.mouseLeaveOption}>
        Lables
      </Link>

      <Link to="/ship_to_papers" 
        style={linkStyles} 
        onMouseOver={this.mouseOverOption}
        onMouseLeave={this.mouseLeaveOption}>
        Ship To Slip
      </Link>

    </nav>
    </div>
  )};
}

const MenuButton = (props) => {
    return(
        <div id="hamburger_icon" 
            onClick={props.clickHandler}
            style={{backgroundColor: props.clicked ? "#494949" : "#082b44"}}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    )
}

export default Nav;