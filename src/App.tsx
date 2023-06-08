import React from "react";
import "./App.css";

import { PayPal } from "./components/PayPal";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
} from "paypal-checkout-components";

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
        flow={"checkout" as FlowType}
        buttonLabel={"pay" as ButtonLabelOption}
        buttonColor={"gold" as ButtonColorOption}
        createPaymentUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiOWZiYzJiMDQtZDYzNS00YjdhLWFiODQtZDA1NGY3MjIyYTA5IiwiY2FydElkIjoiNzlkNjMwNmMtZjViMC00MjgzLThhOTMtZTczZjI0MGQ0MjVkIn0.Jc5ar_mMUpgonk3W4TG1GtuaYFlJushOrA8k7u5Up-Q"
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
