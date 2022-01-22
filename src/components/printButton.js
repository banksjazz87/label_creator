import * as React from "react";

const PrintButton = () => {

    const print = (e) => {
        e.preventDefault();
        window.print();
    }
  return(
  <div id="print_container">
    <button id="print_button" onClick={print}>Print</button>;
  </div>
  )
};

export default PrintButton;
