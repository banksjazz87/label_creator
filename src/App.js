import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../src/assets/app.scss";
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
    <div>
      <ParentPackSlip />
      <Nav />
    </div>
  );
}

function Labels() {
  return (
    <div>
      <ParentLabels />
      <Nav />
    </div>
  );
}

function ShipTo() {
  return (
    <div>
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
    <div>
      <ParentShippingCreator />
      <Nav />
    </div>
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
