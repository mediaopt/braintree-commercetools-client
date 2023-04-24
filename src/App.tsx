import React from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";

function App() {
  return (
    <div className="App">
      <CreditCard
        getClientTokenUrl="/getClientToken"
        paymentId="01c5c18a-1495-46bd-bc48-68d8b2470a2b"
        paymentVersion={1}
      />
    </div>
  );
}

export default App;
