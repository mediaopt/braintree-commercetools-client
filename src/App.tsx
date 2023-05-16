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
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJhN2Q0NjZhNC02OTFhLTQzMzktYTJiYS1kYmI0NjY3OTZkOTUifQ.TA3uecV7CcxM1FMQazb0QjFIRxVBPl25Rq23HvvsQ_U"
        purchaseCallback={() => {
          console.log("Do something");
        }}
        fullWidth={true}
        buttonText={"Pay €80"}
      />
    </div>
  );
}

export default App;
