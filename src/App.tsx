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
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJmMDBjZGIwNS0wZTZmLTQ5YTYtOTQzMS0xMDU5ODViYzdkMzgiLCJ3aXNobGlzdElkIjoiYWMzNjBhYjgtODg0NS00YTc1LWJlNjctMzg1Njg1NmY3ODkyIn0.fyp-3rbe66woogyOwCO1wPeU729_T1yw4RXeiLLnGmQ"
        purchaseCallback={(result) => {
          console.log("Do something");
        }}
        fullWidth={true}
        buttonText={"Pay €X"}
        cartInformation={cartInformation}
      />
    </div>
  );
}

export default App;
