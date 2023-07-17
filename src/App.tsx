import React, { useState } from "react";
import "./App.css";

import { LocalPaymentBancontactType, LocalPaymentP24Type } from "./types";
import { CreditCard } from "./components/CreditCard";
import { GooglePay } from "./components/GooglePay";
import { Venmo } from "./components/Venmo";
import { PayPal } from "./components/PayPal";
import { ApplePay } from "./components/ApplePay";
import { ACH } from "./components/ACH";
import { LocalPaymentMethod } from "./components/LocalPaymentMethods";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
} from "paypal-checkout-components";

const COFE_IDENTIFIER: string = "jye";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI0MzE1YmY4Mi1lMTQzLTQzZTUtOGEyNi1mNjY1YjQ2ZWE4NTIifQ.orcqtWR4RJaWACM_1T2_nLclkncbWW6wbYJVJfUx3z8";

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
    purchaseCallback: (result: any) => {
      console.log("Do something", result);
    },
    fullWidth: true,
    buttonText: "Pay €X",
    cartInformation: cartInformation,
  };

  const Bancontact = LocalPaymentMethod as LocalPaymentBancontactType;
  const P24 = LocalPaymentMethod as LocalPaymentP24Type;
  const [choosenPaymentMethod, setChoosenPaymentMethod] = useState("");
  const paymentMethods: { [index: string]: JSX.Element } = {
    CreditCard: <CreditCard {...params} enableVaulting={true} />,
    PayPal: (
      <PayPal
        flow={"checkout" as FlowType}
        buttonColor={"blue" as ButtonColorOption}
        buttonLabel={"pay" as ButtonLabelOption}
        payLater={true}
        payLaterButtonColor={"blue" as ButtonColorOption}
        {...params}
      />
    ),
    GooglePay: (
      <GooglePay
        totalPriceStatus={"FINAL"}
        googleMerchantId={"merchant-id-from-google"}
        acquirerCountryCode={"DE"}
        environment={"TEST"}
        {...params}
      />
    ),
    Venmo: (
      <Venmo
        desktopFlow={"desktopWebLogin"}
        mobileWebFallBack={true}
        paymentMethodUsage={"multi_use"}
        useTestNonce={true}
        setVenmoUserName={(venmoName) => console.log(venmoName)}
        ignoreBowserSupport={true}
        {...params}
      />
    ),
    ApplePay: <ApplePay applePayDisplayName="My Store" {...params} />,
    ACH: (
      <ACH
        mandateText='By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.'
        {...params}
      />
    ),
    Bancontact: (
      <Bancontact
        {...params}
        currencyCode={"EUR"}
        countryCode={"BE"}
        paymentType={"bancontact"}
        merchantAccountId={"test"}
      />
    ),
    P24: (
      <P24
        {...params}
        currencyCode={["EUR", "PL"]}
        paymentType={"p24"}
        countryCode={"PL"}
        merchantAccountId={"test"}
      />
    ),
  };
  const changePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    setChoosenPaymentMethod(e.target.value);
  };

  return (
    <div className="App">
      {Object.keys(paymentMethods).map((entry, index) => (
        <div key={index}>
          <label>
            <input
              onChange={changePaymentMethod}
              type="radio"
              name="paymentmethod"
              value={entry}
            />
            {entry}
          </label>
        </div>
      ))}
      <div>{paymentMethods[choosenPaymentMethod] ?? <></>}</div>
    </div>
  );
}

export default App;
