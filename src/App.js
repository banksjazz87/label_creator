import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

let testing = "";

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

function PackSlip(props) {
    return(
        <div>
            <h1>This is the pack slip page</h1> 
            <h2>{testing}</h2>
            <h2>{testing}</h2>
            <h2>{testing}</h2>
            <h2>{testing}</h2>
            <Nav />

        </div>
    );
}

function Labels() {
    return(
        <div>
            <h1>This is the labels page</h1>
            <Nav />
        </div>
    );
}

function ShipTo() {
    return(
        <div>
            <h1>This is the ship to page</h1>
            <Nav />
        </div>
    )
}
function Text() {
    return(
        <div>
            <p>This is just a test</p>
        </div>
    );
}

function Home() {
    return(
        <div>
          <main>
            <h1>This is the home Page</h1>
            <p>Welcome to the home page</p>
          </main>
          <Text />
          <Nav />
        </div>
    )
}

function ShippingCreator() {
    
    return(
        <div>
            <h1>Shipping Creator</h1>
            <p>This is where we will create all of the various labels and slips</p>
            <UserInfo />
            <Nav />
        </div>
    )
}


class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            test: ""
        }
        this.currentInput = this.currentInput.bind('this');
    }

   currentInput = (e) => {
        this.setState({
            test: e.target.value
        });
    }
    render(){

    return(
        <div>
            <p>{this.state.test}</p>
            <input type='text' onChange={this.currentInput}></input>
        </div>
    )
}
}

function About() {
    return(
        <div>
          <main>
            <h1>This is the about page</h1>
            <p>Welcome to the about page</p>
          </main>
          <Nav />
        </div>
    )
}



export default App;
