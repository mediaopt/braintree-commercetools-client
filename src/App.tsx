import React from "react";
import "./App.css";

import { GooglePay } from "./components/GooglePay";

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
      <GooglePay
        createPaymentUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJkZGRlZWNmNi02Zjk1LTRkMmQtYjk3NS0xMjk4YTllNTcyZTgifQ.QDn_sB7qcBYGxRve549qIPWYXcYo_6UciLF9zYGNz8Y"
        purchaseCallback={(result) => {
          console.log("Do something");
        }}
        fullWidth={true}
        buttonText={"Pay €X"}
        cartInformation={cartInformation}
        environment={"TEST"}
        totalPriceStatus={"FINAL"}
        googleMerchantId={"merchant-id-from-google"}
        acquirerCountryCode={"DE"}
      />
    </div>
  );
}

export default App;
