import React from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";
import { GooglePay } from "./components/GooglePay";
import { Venmo } from "./components/Venmo";
import { PayPal } from "./components/PayPal";
import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
} from "paypal-checkout-components";

const COFE_IDENTIFIER = "majid";
const COFE_SESSION_VALUE =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI1ZTE1NWNjNC1iNmMzLTRlZjktYmJmZS05ZDM2MzcyNjVlMWIiLCJ3aXNobGlzdElkIjoiNzc1OWVlY2YtNWNhMS00MTQyLWFiZWEtMjZiNDRjMWQ0MjYwIn0.d5J7dj0DQGTMKKFUb5-flBx_UFm2dPbuUI05p3w3cT8";

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

  const params = {
    createPaymentUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPayment`,
    getClientTokenUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken`,
    purchaseUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase`,
    sessionKey: "frontastic-session",
    sessionValue: COFE_SESSION_VALUE,
    purchaseCallback: (result) => {
      console.log("Do something", result);
    },
    fullWidth: true,
    buttonText: "Pay €X",
    cartInformation: cartInformation,
  };

  return (
    <div className="App">
      <details>
        <summary>CreditCard</summary>
        <div className="component-wrapper">
          <CreditCard {...params} />
        </div>
      </details>

      <details>
        <summary>PayPal</summary>
        <div className="component-wrapper">
          <PayPal
            flow={"checkout" as FlowType}
            buttonColor={"blue" as ButtonColorOption}
            buttonLabel={"pay" as ButtonLabelOption}
            {...params}
          />
        </div>
      </details>

      <details>
        <summary>GooglePay</summary>
        <div className="component-wrapper">
          <GooglePay
            totalPriceStatus={"FINAL"}
            googleMerchantId={"merchant-id-from-google"}
            acquirerCountryCode={"DE"}
            environment={"TEST"}
            {...params}
          />
        </div>
      </details>

      <details>
        <summary>Venmo</summary>
        <div className="component-wrapper">
          <Venmo
            desktopFlow={"desktopWebLogin"}
            mobileWebFallBack={true}
            paymentMethodUsage={"multi_use"}
            useTestNonce={true}
            setVenmoUserName={(venmoName) => console.log(venmoName)}
            ignoreBowserSupport={true}
            {...params}
          />
        </div>
      </details>
    </div>
  );
}

export default App;
