import React, { useState } from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";
import { GooglePay } from "./components/GooglePay";
import { Venmo } from "./components/Venmo";
import { PayPal } from "./components/PayPal";
import { ApplePay } from "./components/ApplePay";
import { ACH } from "./components/ACH";
import { ShippingAddressOverride } from "./types";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
  Intent,
  LineItem,
  LineItemKind,
} from "paypal-checkout-components";

const COFE_IDENTIFIER: string = "majid";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJiMWM2NTM1OC1jNDM1LTRhMTAtOTQ0ZC04MjJhNTVhOTMwNjIiLCJhY2NvdW50Ijp7ImFjY291bnRJZCI6IjJkODNmNDcwLWZiNTktNGY5ZS1hYjcxLWRkMjdiMzBlZjI2NiIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJiaXJ0aGRheSI6IjE5NzQtMDktMjBUMDA6MDA6MDAuMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiYWRkcmVzc2VzIjpbeyJhZGRyZXNzSWQiOiJJZ2RnNmtudiIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IkRvZSIsInN0cmVldE5hbWUiOiJGaXJzdCBTdHJlZXQiLCJzdHJlZXROdW1iZXIiOiIxMiIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJFeGFtcGxlIENpdHkiLCJjb3VudHJ5IjoiVVMiLCJwaG9uZSI6IiszMTIzNDU2NzgiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6dHJ1ZSwiaXNEZWZhdWx0U2hpcHBpbmdBZGRyZXNzIjpmYWxzZX0seyJhZGRyZXNzSWQiOiJpbXduUlBSRiIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IkRvZSIsInN0cmVldE5hbWUiOiJUaGlyZCBTdHJlZXQiLCJzdHJlZXROdW1iZXIiOiIzNCIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJFeGFtcGxlIENpdHkiLCJjb3VudHJ5IjoiTkwiLCJwaG9uZSI6IiszMTEyMzQ1Njc4IiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOmZhbHNlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOmZhbHNlfSx7ImFkZHJlc3NJZCI6IlplYTMwTXVpIiwiZmlyc3ROYW1lIjoiU2ltZW9uZSIsImxhc3ROYW1lIjoiRWxzZSIsInN0cmVldE5hbWUiOiJVbm5hbWVkc3RyIiwic3RyZWV0TnVtYmVyIjoiMjM0IiwicG9zdGFsQ29kZSI6IjEyMzQ1IiwiY2l0eSI6IlRvd24iLCJjb3VudHJ5IjoiREUiLCJwaG9uZSI6IjEyNDMyNTM2NTQ2NDIzMTQzNTY3IiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOmZhbHNlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOmZhbHNlfV19LCJ3aXNobGlzdElkIjoiNzRkYzhkMzItZmJkZi00NjljLWFmN2UtYzlkNjE2MTIyN2MwIn0.rSEeF_NFO-gJYNrlOtk7SJHBXwCWKPVvMJ2RjspJNnc";

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

  const paypalLineItemUndefinedValues = {
    unitTaxAmount: undefined,
    description: undefined,
    productCode: undefined,
    url: undefined,
  };
  const paypalLineItem: LineItem[] = [
    {
      quantity: "10",
      unitAmount: "100.00",
      name: "test name",
      kind: "debit" as LineItemKind,
      ...paypalLineItemUndefinedValues,
    },
    {
      quantity: "10",
      unitAmount: "100.00",
      name: "test name",
      kind: "debit" as LineItemKind,
      ...paypalLineItemUndefinedValues,
    },
  ];
  const paypalShippingAddressOverride: ShippingAddressOverride = {
    recipientName: "Scruff McGruff",
    line1: "1234 Main St.",
    line2: "Unit 1",
    city: "Chicago",
    countryCode: "US",
    postalCode: "60652",
    state: "IL",
    phone: "123.456.7890",
  };

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
        locale="en_GB"
        intent={"capture" as Intent}
        commit={true}
        enableShippingAddress={true}
        shippingAddressEditable={false}
        paypalLineItem={paypalLineItem}
        billingAgreementDescription="Your agreement description"
        shippingAddressOverride={paypalShippingAddressOverride}
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
