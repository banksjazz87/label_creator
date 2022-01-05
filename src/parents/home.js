import * as React from "react";
import "../assets/app.scss";

function Text() {
  return (
    <div>
      <p>This is just a test</p>
    </div>
  );
}

function ParentHome() {
  return (
    <div>
      <main>
        <h1>This is the home Page</h1>
        <p>Welcome to the home page</p>
      </main>
      <Text />
    </div>
  );
}

export default ParentHome;
