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
import "../src/assets/options.scss";
import "../src/assets/login.scss";
import ParentShippingCreator from "./parents/creator.js";
import ParentLabels from "./parents/label.js";
import ParentPackSlip from "./parents/packSlip.js";
import ParentShipTo from "./parents/shipTo.js";
import Nav from "./components/navBar.js";
import Footer from "./components/footer.js";
import PrintButton from "./components/printButton.js";
import OptionsPage from "./parents/optionsPage.js";
import LoginPage from "./parents/loginPage.js";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="search_page" element={<Options/>}/>
        <Route path="creator_page" element={<ShippingCreator />} />
        <Route path="pack_slip" element={<PackSlip />} />
        <Route path="labels" element={<Labels />} />
        <Route path="ship_to_papers" element={<ShipTo />} />
      </Routes>
    </div>
  );
}

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
      <OptionsPage />
    </div>
  )
}

function Login() {
  return(
    <div id="login_page">
      <LoginPage />
    </div>
  )
}


export default App;
