import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
   <div>
       <h1>Welcom to React Router!</h1>
       <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
       </Routes>
       <Text />
   </div>
  );
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
          <nav>
              <Link to='/about'>About</Link>
          </nav>

        </div>
    )
}

function About() {
    return(
        <div>
          <main>
            <h1>This is the about page</h1>
            <p>Welcome to the about page</p>
          </main>
          <nav>
              <Link to='/'>Home</Link>
          </nav>

        </div>
    )
}



export default App;
