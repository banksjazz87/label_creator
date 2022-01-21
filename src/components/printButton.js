import * as React from "react";

const PrintButton = () => {

    const print = (e) => {
        e.preventDefault();
        window.print();
    }
  return <button onClick={print}>Print</button>;
};

export default PrintButton;
