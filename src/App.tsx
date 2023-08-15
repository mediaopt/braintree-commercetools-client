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

const COFE_IDENTIFIER: string = "majid";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJkYjQ5ZjEzZi0wNjM4LTQzNGQtYmFjYi1mN2M5MWY4ZjcxZWQiLCJ3aXNobGlzdElkIjoiMzEwZGIzNTItZTQzNS00YzI1LWJiYzUtYWFmMmYzZDAyNDU3In0.RHs1tAjeTNudQBLMULnvI5bYkx0z0XJBqAS7LN0T5fU";

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
    CreditCard: <CreditCardVault {...params} />,
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
