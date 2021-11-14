import * as React from "react";
import "./App.css";
import { Nav } from "./App.js";

function Text() {
  return (
    <div>
      <p>This is just a test</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <main>
        <h1>This is the home Page</h1>
        <p>Welcome to the home page</p>
      </main>
      <Text />
      <Nav />
    </div>
  );
}

export default Home;
