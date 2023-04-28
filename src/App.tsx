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
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiNWY0NzhlYzctZTYyMC00ZWQ2LWJjY2QtODNkZjIxMTlmMmNhIiwiY2FydElkIjoiMmM0ZDRhNGYtOGUyMS00MDU3LWFmYjAtNTcwYWRlZTQ5Mjc3In0.nUSwua-lGef509sF8ccmLcx84n--rC02zboLX_SpRo8"
      />
    </div>
  );
}

export default App;
