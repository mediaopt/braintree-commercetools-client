import React, { useState } from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";
import { GooglePay } from "./components/GooglePay";
import { Venmo } from "./components/Venmo";
import { PayPal } from "./components/PayPal";
import { ApplePay } from "./components/ApplePay";
import { ACH } from "./components/ACH";
import {
  Bancontact,
  P24,
  Sofort,
  BLIK,
  MyBank,
  EPS,
  Giropay,
  Grabpay,
  IDeal,
} from "./components/LocalPaymentMethods";
import { ShippingAddressOverride } from "./types";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
  Intent,
  LineItem,
  LineItemKind,
} from "paypal-checkout-components";

const COFE_IDENTIFIER: string = "jye";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50Ijp7ImFjY291bnRJZCI6IjgwZWRiOGQyLTBkYjEtNGY3NS1iMzllLWQwNzA3OWE5ZGQyNSIsImVtYWlsIjoibWFqaWQuYWJiYXNpQG1lZGlhb3B0LmRlIiwic2FsdXRhdGlvbiI6Im1yIiwiZmlyc3ROYW1lIjoiTWFqaWQiLCJsYXN0TmFtZSI6IkFiYmFzaSIsImJpcnRoZGF5IjoiMTk4OS0wMy0wNVQwMDowMDowMC4wMDBaIiwiY29uZmlybWVkIjp0cnVlLCJhZGRyZXNzZXMiOlt7ImFkZHJlc3NJZCI6IlhacXNmbmlUIiwiZmlyc3ROYW1lIjoiTWFqaWQiLCJsYXN0TmFtZSI6IkFiYmFzaSIsInN0cmVldE5hbWUiOiJIb2Noc3RyYVx1MDBkZmUgMzciLCJzdHJlZXROdW1iZXIiOiJIb2Noc3RyYVx1MDBkZmUgMzciLCJwb3N0YWxDb2RlIjoiMTMzNTciLCJjaXR5IjoiQmVybGluIiwiY291bnRyeSI6IkRFIiwicGhvbmUiOiIrOTk1NTk5MzU3NTYyIiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOnRydWUsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6dHJ1ZX0seyJhZGRyZXNzSWQiOiI2SDdsR2J5MCIsImZpcnN0TmFtZSI6Ik1hamlkIiwibGFzdE5hbWUiOiJBYmJhc2kiLCJzdHJlZXROYW1lIjoiSG9jaHN0cmFcdTAwZGZlIDM3Iiwic3RyZWV0TnVtYmVyIjoiSG9jaHN0cmFcdTAwZGZlIDM3IiwicG9zdGFsQ29kZSI6IjEzMzU3IiwiY2l0eSI6IkZsb3JpZGEiLCJjb3VudHJ5IjoiVVMiLCJwaG9uZSI6Iis5OTU1OTkzNTc1NjIiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9XX0sIndpc2hsaXN0SWQiOiJhOTAxYmQ1Yi1lY2E0LTQ1NWMtOWQyYy0yMzhmMTIxMmE1YjMiLCJjYXJ0SWQiOiIxOThlYmY5My1hNmM0LTRhNGUtYmNkZi0zMjBkOTA0MDk4YWIifQ.8bJ56pDqrIh3a_mWpYSdWI7p9fqm1ihItGfEMO8nhw4";

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
    purchaseCallback: (result: any, options: any) => {
      console.log("Do something", result, options);
    },
    fullWidth: true,
    buttonText: "Pay €X",
    cartInformation: cartInformation,
  };

  const localPaymentParams = {
    saveLocalPaymentIdUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/setLocalPaymentId`,
    fallbackUrl: "/test",
    fallbackButtonText: "purchase",
    merchantAccountId: "",
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
    CreditCard: (
      <CreditCard {...params} enableVaulting={true} useKount={true} />
    ),
    PayPal: (
      <PayPal
        flow={"checkout" as FlowType}
        buttonColor={"blue" as ButtonColorOption}
        buttonLabel={"pay" as ButtonLabelOption}
        payLater={true}
        payLaterButtonColor={"blue" as ButtonColorOption}
        locale="en_GB"
        intent={"capture" as Intent}
        useKount={true}
        {...params}
      />
    ),
    PayPalBuyNow: (
      <PayPal
        flow={"checkout" as FlowType}
        buttonColor={"blue" as ButtonColorOption}
        buttonLabel={"buynow" as ButtonLabelOption}
        commit={true}
        payLater={false}
        locale="en_GB"
        intent={"capture" as Intent}
        enableShippingAddress={true}
        shippingAddressEditable={false}
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
        useKount={true}
        {...params}
      />
    ),
    ApplePay: <ApplePay applePayDisplayName="My Store" {...params} />,
    ACH: (
      <ACH
        mandateText='By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.'
        getAchVaultTokenURL={`https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/getAchVaultToken`}
        useKount={true}
        {...params}
      />
    ),
    Bancontact: (
      <Bancontact
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"BE"}
        paymentType={"bancontact"}
        useKount={true}
      />
    ),
    P24: (
      <P24
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        paymentType={"p24"}
        countryCode={"PL"}
        useKount={true}
      />
    ),
    Sofort: (
      <Sofort
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        paymentType={"sofort"}
        countryCode={"DE"}
        useKount={true}
      />
    ),
    BLIK: (
      <BLIK
        {...params}
        {...localPaymentParams}
        currencyCode={"PLN"}
        countryCode={"PL"}
        paymentType={"blik"}
        useKount={true}
      />
    ),
    MyBank: (
      <MyBank
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"IT"}
        paymentType={"mybank"}
        useKount={true}
      />
    ),
    EPS: (
      <EPS
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"AT"}
        paymentType={"eps"}
        useKount={true}
      />
    ),
    Giropay: (
      <Giropay
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"DE"}
        paymentType={"giropay"}
        useKount={true}
      />
    ),
    Grabpay: (
      <Grabpay
        {...params}
        {...localPaymentParams}
        currencyCode={"SGD"}
        countryCode={"SG"}
        paymentType={"grabpay"}
        useKount={true}
      />
    ),
    iDeal: (
      <IDeal
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"NL"}
        paymentType={"ideal"}
        useKount={true}
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
