import React from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";

function App() {
  return (
    <div className="App">
      <CreditCard
        createPaymentUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI1YTkzZDE4Zi03NmE2LTQzZmMtODI3Zi0wNTE3NzRkY2ZmMGIifQ.Eg3k1OGjj5whHK-pIY23WQMnsmjxo75BbJrm82W5cG8"
        purchaseCallback={() => {
          console.log("Do something");
        }}
      />
    </div>
  );
}

export default App;
