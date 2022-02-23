import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "../src/assets/app.scss";
import "../src/assets/creator.scss";
import "../src/assets/footer.scss";
import "../src/assets/creatorMediaQueries.scss";
import "../src/assets/label.scss";
import "../src/assets/packSlip.scss";
import "../src/assets/shipTo.scss";
import "../src/assets/printButton.scss";
import "../src/assets/packSlipMediaQuery.scss";
import "../src/assets/options.scss"
import ParentShippingCreator from "./parents/creator.js";
import ParentLabels from "./parents/label.js";
import ParentPackSlip from "./parents/packSlip.js";
import ParentShipTo from "./parents/shipTo.js";
import Nav from "./components/navBar.js";
import Footer from "./components/footer.js";
import PrintButton from "./components/printButton.js";
import OptionsPage from "./parents/optionsPage.js";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Options/>}/>
        <Route path="creator_page" element={<ShippingCreator />} />
        <Route path="pack_slip" element={<PackSlip />} />
        <Route path="labels" element={<Labels />} />
        <Route path="ship_to_papers" element={<ShipTo />} />
      </Routes>
    </div>
  );
}

/*class Nav extends React.Component {
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
  }
  render(){
  return (
    <nav id="navbar">
      <Link to="/shipping_creator">Shipping Create Docs</Link>
      <Link to="/pack_slip">Pack Slip</Link>
      <Link to="/labels">Lables</Link>
      <Link to="/ship_to_papers">Ship To Slip</Link>
    </nav>
  )};
}*/

function PackSlip() {
  return (
    <div id="pack_slip_body">
      <Nav />
      <ParentPackSlip />
      <PrintButton />
    </div>
  );
}

function Labels() {
  return (
    <div id="labels_body">
      <Nav />
      <ParentLabels />
    </div>
  );
}

function ShipTo() {
  return (
    <div id="ship_to_body">
      <Nav />
      <ParentShipTo />
    </div>
  );
}


function ShippingCreator() {
  return (
    <body id="creator_body">
      <Nav />
      <ParentShippingCreator />
      <Footer />
    </body>
  );
}

function Options(){
  return(
    <div id="options_body">
      <Nav />
      <OptionsPage />
    </div>
  )
}


export default App;
