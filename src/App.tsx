import React from "react";
import "./App.css";

import { PayPal } from "./components/PayPal";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
} from "paypal-checkout-components";
import { Venmo } from "./components/Venmo";

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
      <Venmo
        createPaymentUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-jye-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIzNGI1YmIwZC0wMDM2LTQzZjktYjRjOS0xZWRjM2M2MjkyMWYifQ.cc1lMi7JtjzseFl6TykkbmKFXYDGl9C66Mykj_hVaDc"
        purchaseCallback={(result) => {
          console.log("Do something");
        }}
        fullWidth={true}
        buttonText={"Pay €X"}
        cartInformation={cartInformation}
        desktopFlow={"desktopWebLogin"}
        mobileWebFallBack={true}
        paymentMethodUsage={"multi_use"}
        useTestNonce={true}
        setVenmoUserName={(venmoName) => console.log(venmoName)}
        ignoreBowserSupport={true}
      />
    </div>
  );
}

export default App;
