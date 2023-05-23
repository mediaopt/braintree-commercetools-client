import React from "react";
import "./App.css";

import { PayPal } from "./components/PayPal";
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
      <PayPal
        flow="capture"
        createPaymentUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiM2UwMjIwN2YtNWJmZS00YjdkLThlMGItZTg1OWU2ODMwZTNiIiwiY2FydElkIjoiOGM3Mjk0MmUtZTAyYS00NDBhLTkxMzAtNDhkMTU3ZWIxOThhIn0.w46GfB80VXcxwNrBAkfCBMCmBi882ECgyubNLE60-8Q"
        purchaseCallback={() => {
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
