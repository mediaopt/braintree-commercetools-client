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
        createPaymentUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIzZmVkMmY0Yi1mY2M4LTQyYjMtYjVhOC1lZTJiYTYyZDk1ODIifQ.KxnjCwM-8WGb2ID4NHbPewD04l1H7Toegj_bKkmnn6g"
        purchaseCallback={() => {
          console.log("Do something");
        }}
        fullWidth={true}
        buttonText={"Pay €80"}
        cartInformation={cartInformation}
        fullCartAmount={149}
      />
    </div>
  );
}

export default App;
