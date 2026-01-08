import React from "react";
import ReactDOM from "react-dom";


function PrintingOption() {
  const print = () => window.print();

  return (
    <div>
      <button className="printButton" onClick={print}>
        Print
      </button>
    </div>
  );
}

export default PrintingOption
