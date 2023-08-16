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
import {
  ShippingAddressOverride,
  Shipping,
  PayPalShippingOptions,
} from "./types";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
  Intent,
  LineItem,
  LineItemKind,
  ButtonShapeOption,
  ButtonSizeOption,
} from "paypal-checkout-components";
import { CreditCardVault } from "./components/PureVaulting/CreditCard";
import { PayPalVault } from "./components/PureVaulting/PayPal";

const COFE_IDENTIFIER: string = "jye";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIxZDQ1OGJiNC01OTk3LTRiNmYtOWU5Mi1mMGYwMzJlYTAwYzYiLCJhY2NvdW50Ijp7ImFjY291bnRJZCI6IjJkODNmNDcwLWZiNTktNGY5ZS1hYjcxLWRkMjdiMzBlZjI2NiIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJiaXJ0aGRheSI6IjE5NzQtMDktMjBUMDA6MDA6MDAuMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiYWRkcmVzc2VzIjpbeyJhZGRyZXNzSWQiOiJJZ2RnNmtudiIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IkRvZSIsInN0cmVldE5hbWUiOiJGaXJzdCBTdHJlZXQiLCJzdHJlZXROdW1iZXIiOiIxMiIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJFeGFtcGxlIENpdHkiLCJjb3VudHJ5IjoiVVMiLCJwaG9uZSI6IiszMTIzNDU2NzgiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9LHsiYWRkcmVzc0lkIjoiaW13blJQUkYiLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJzdHJlZXROYW1lIjoiVGhpcmQgU3RyZWV0Iiwic3RyZWV0TnVtYmVyIjoiMzQiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiRXhhbXBsZSBDaXR5IiwiY291bnRyeSI6Ik5MIiwicGhvbmUiOiIrMzExMjM0NTY3OCIsImlzRGVmYXVsdEJpbGxpbmdBZGRyZXNzIjp0cnVlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOnRydWV9LHsiYWRkcmVzc0lkIjoiWmVhMzBNdWkiLCJmaXJzdE5hbWUiOiJTaW1lb25lIiwibGFzdE5hbWUiOiJFbHNlIiwic3RyZWV0TmFtZSI6IlVubmFtZWRzdHIiLCJzdHJlZXROdW1iZXIiOiIyMzQiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiVG93biIsImNvdW50cnkiOiJERSIsInBob25lIjoiMTI0MzI1MzY1NDY0MjMxNDM1NjciLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9XX0sIndpc2hsaXN0SWQiOiI3NGRjOGQzMi1mYmRmLTQ2OWMtYWY3ZS1jOWQ2MTYxMjI3YzAifQ.H9QMibJLj3HnXVPF-F1NwuKncro-tqyAPnTVHD108xM";

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

  const paypalLineItemUndefinedValues = {
    unitTaxAmount: undefined,
    description: undefined,
    productCode: undefined,
    url: undefined,
  };

  const lineItems: LineItem[] = [
    {
      quantity: "1",
      unitAmount: "2.50",
      name: "test name",
      kind: "debit" as LineItemKind,
      ...paypalLineItemUndefinedValues,
    },
    {
      quantity: "1",
      unitAmount: "2.50",
      name: "test name",
      kind: "debit" as LineItemKind,
      ...paypalLineItemUndefinedValues,
    },
  ];

  const shipping: Shipping = {
    firstName: "majid",
    lastName: "abbasi",
  };

  const shippingOptions: PayPalShippingOptions[] = [
    {
      amount: 1.0,
      countryCode: "DE",
    },
    {
      amount: 3.0,
      countryCode: "US",
    },
  ];

  const params = {
    createPaymentUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPayment`,
    createPaymentForVault: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPaymentForVault`,
    getClientTokenUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken`,
    vaultPaymentMethodUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/vaultPaymentMethod`,
    purchaseUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase`,
    sessionKey: "frontastic-session",
    sessionValue: COFE_SESSION_VALUE,
    purchaseCallback: (result: any, options: any) => {
      console.log("Do something", result, options);
    },
    fullWidth: true,
    buttonText: "Pay €X",
    cartInformation: cartInformation,
    lineItems: lineItems,
    shipping: shipping,
  };

  const localPaymentParams = {
    saveLocalPaymentIdUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/setLocalPaymentId`,
    fallbackUrl: "/test",
    fallbackButtonText: "purchase",
    merchantAccountId: "",
  };

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
        shape={"pill" as ButtonShapeOption}
        size={"small" as ButtonSizeOption}
        tagline={true}
        height={55}
        shippingOptions={shippingOptions}
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

  const [choosenVaultMethod, setChoosenVaultMethod] = useState("");
  const vaultMethods: { [index: string]: JSX.Element } = {
    CreditCardVault: <CreditCardVault {...params} />,
    PayPalVault: (
      <PayPalVault
        flow={"vault" as FlowType}
        buttonColor={"blue" as ButtonColorOption}
        buttonLabel={"paypal" as ButtonLabelOption}
        commit={true}
        payLater={false}
        locale="en_GB"
        intent={"capture" as Intent}
        {...params}
      />
    ),
  };
  const changePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    setChoosenPaymentMethod(e.target.value);
  };
  const changeVaultMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    setChoosenVaultMethod(e.target.value);
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
      <hr />
      <h2>Pure Vaults</h2>
      {Object.keys(vaultMethods).map((entry, index) => (
        <div key={index}>
          <label>
            <input
              onChange={changeVaultMethod}
              type="radio"
              name="vaultmethod"
              value={entry}
            />
            {entry}
          </label>
        </div>
      ))}
      <div>{vaultMethods[choosenVaultMethod] ?? <></>}</div>
    </div>
  );
}

export default App;
