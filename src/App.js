import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../src/assets/app.scss";
import "../src/assets/creator.scss";
import "../src/assets/label.scss";
import "../src/assets/packSlip.scss";
import "../src/assets/shipTo.scss";
import ParentAbout from "./parents/about.js";
import ParentShippingCreator from "./parents/creator.js";
import ParentHome from "./parents/home.js";
import ParentLabels from "./parents/label.js";
import ParentPackSlip from "./parents/packSlip.js";
import ParentShipTo from "./parents/shipTo.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shipping_creator" element={<ShippingCreator />} />
        <Route path="about" element={<About />} />
        <Route path="pack_slip" element={<PackSlip />} />
        <Route path="labels" element={<Labels />} />
        <Route path="ship_to_papers" element={<ShipTo />} />
      </Routes>
    </div>
  );
}

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/shipping_creator">Shipping Create Docs</Link>
      <Link to="/about">About</Link>
      <Link to="/pack_slip">Pack Slip</Link>
      <Link to="/labels">Lables</Link>
      <Link to="/ship_to_papers">Ship To Slip</Link>
    </nav>
  );
}

function PackSlip() {
  return (
    <div id="pack_slip_body">
      <ParentPackSlip />
      <Nav />
    </div>
  );
}

function Labels() {
  return (
    <div id="labels_body">
      <ParentLabels />
      <Nav />
    </div>
  );
}

function ShipTo() {
  return (
    <div id="ship_to_body">
      <ParentShipTo />
      <Nav />
    </div>
  );
}

function Home() {
  return (
    <div>
      <ParentHome />
      <Nav />
    </div>
  );
}

function ShippingCreator() {
  return (
    <body id="creator_body">
      <ParentShippingCreator />
      <Nav />
    </body>
  );
}

function About() {
  return (
    <div>
      <ParentAbout />
      <Nav />
    </div>
  );
}

export default App;
