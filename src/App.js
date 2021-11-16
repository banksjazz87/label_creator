import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ParentAbout from "./about.js";
import ParentShippingCreator from "./creator.js";
import ParentHome from "./home.js";
import ParentLabels from "./label.js";
import ParentPackSlip from "./packSlip.js";
import ParentShipTo from "./shipTo.js";



function App(){
  return (
   <div>
       <Routes>
            <Route path='/' element={<Home />} />
            <Route path='shipping_creator' element={<ShippingCreator />} />
            <Route path='about' element={<About />} />
            <Route path='pack_slip' element={<PackSlip />} />
            <Route path='labels' element={<Labels />} />
            <Route path='ship_to_papers' element={<ShipTo />} />
       </Routes>
   </div>
  );
}


function Nav() {
    return(
        <nav>
              <Link to='/'>Home</Link>
              <Link to='/shipping_creator'>Shipping Create Docs</Link>
              <Link to='/about'>About</Link>
              <Link to='/pack_slip'>Pack Slip</Link>
              <Link to='/labels'>Lables</Link>
              <Link to='/ship_to_papers'>Ship To Slip</Link>
        </nav>
    )
}

function PackSlip() {
    return(
        <div>
            <ParentPackSlip />
            <Nav />

        </div>
    );
}

function Labels() {
    return(
        <div>
            <ParentLabels />
            <Nav />
        </div>
    );
}

function ShipTo() {
    return(
        <div>
            <ParentShipTo />
            <Nav />
        </div>
    )
}


function Home() {
    return(
        <div>
          <ParentHome />
          <Nav />
        </div>
    )
}

function ShippingCreator() {
    
    return(
        <div>
            <ParentShippingCreator />
            <Nav />
        </div>
    )
}


function About() {
    return(
        <div>
          <ParentAbout />     
          <Nav />
        </div>
    )
}



export default App;

