import React from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";

function App() {
  return (
    <div className="App">
      <CreditCard
        createPaymentUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/purchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIxODA0MGZjYS0xYzZiLTQ5Y2EtOTE2Ny0xMTcwNTYzMGIxNDkiLCJ3aXNobGlzdElkIjoiM2EwM2VhNjEtOTgxNC00YTQ1LThiMDYtMmM5YjZlN2ViZjQwIn0.Dhx0yXIqS0WYpBMNmp2q9odsInRN0-M_p7LkhhRn8-4"
        purchaseCallback={() => {
          console.log("Do something");
        }}
      />
    </div>
  );
}

export default App;
