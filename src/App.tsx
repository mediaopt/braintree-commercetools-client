import React from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";

function App() {
  const cartInformation = {
    account: {
      email: "test@test.com",
    },
    billing: {
      firstName: "John",
      lastName: "Smith",
      streetName: "Hochstraße",
      streetNumber: "37",
      city: "Berlin",
      country: "DE",
      postalCode: "12045",
    },
    shipping: {
      firstName: "John",
      lastName: "Smith",
      streetName: "Hochstraße",
      streetNumber: "37",
      city: "Berlin",
      country: "DE",
      postalCode: "12045",
    },
  };

  return (
    <div className="App">
      <CreditCard
        createPaymentUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJhN2Q0NjZhNC02OTFhLTQzMzktYTJiYS1kYmI0NjY3OTZkOTUifQ.TA3uecV7CcxM1FMQazb0QjFIRxVBPl25Rq23HvvsQ_U"
        purchaseCallback={() => {
          console.log("Do something");
        }}
        fullWidth={true}
        buttonText={"Pay €80"}
        cartInformation={cartInformation}
      />
    </div>
  );
}

export default App;
