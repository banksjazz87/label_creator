import * as React from "react";
import { Link } from "react-router-dom";
import "../assets/nav.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      width: 0,
      overItem: null,
      color: "white",
    };

    this.showHide = this.showHide.bind(this);
    this.displayMenu = this.displayMenu.bind(this);
  }

  //A function that will update how the navbar should be displayed, and the rate in which it should do so.
  displayMenu = () => {
    setInterval(() => {
      if (this.state.width < 100 && this.state.display) {
        this.setState((state) => ({
          width: state.width + 20,
        }));
      } else if (this.state.width > 0 && this.state.display === false) {
        this.setState((state) => ({
          width: state.width - 20,
        }));
      } else {
        clearInterval(this.displayMenu);
      }
    }, 2);
  };

  //A function that updates the state, whether the navbar should be displayed, or not.
  showHide = (e) => {
    e.preventDefault();

    if (this.state.display) {
      this.setState({
        display: false,
      });
    } else {
      this.setState({
        display: true,
      });
    }
    this.displayMenu();
  };

  render() {
    return (
      <div>
        <MenuButton clickHandler={this.showHide} clicked={this.state.display} />
        <nav
          id="navbar"
          style={
            this.state.display
              ? {
                  display: "flex",
                  width: `${this.state.width}vw`,
                }
              : this.state.width > 0
              ? {
                  display: "flex",
                  width: `${this.state.width}vw`,
                }
              : { display: "none" }
          }
        >
          <Link to="/search_page" className="link">
            Search
          </Link>

          <Link to="/creator_page" className="link">
            Shipping Create Docs
          </Link>

          <Link to="/pack_slip" className="link">
            Pack Slip
          </Link>

          <Link to="/labels" className="link">
            Lables
          </Link>

          <Link to="/ship_to_papers" className="link">
            Ship To Slip
          </Link>
        </nav>
      </div>
    );
  }
}

const MenuButton = (props) => {
  return (
    <div id="hamburger_icon" onClick={props.clickHandler}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

export default Nav;
