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
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiZGZmYmFiNDItNmY5MC00NGI5LWE5ZDktZmEyMGRlM2Y3M2M2IiwiY2FydElkIjoiYTI0YzQxNTUtNjJkZC00MDI3LThkN2YtOWM4MWQ2YmU0NmMxIn0.r_FTqJnWvCEWhY4nQGJGME35qFb5D-hg99l6cOZUBmY"
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
