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
  LineItem,
} from "./types";

import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
  Intent,
  ButtonShapeOption,
  ButtonSizeOption,
} from "paypal-checkout-components";
import { CreditCardVault } from "./components/PureVaulting/CreditCard";
import { PayPalVault } from "./components/PureVaulting/PayPal";

const COFE_IDENTIFIER: string = "jye";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIxZDQ1OGJiNC01OTk3LTRiNmYtOWU5Mi1mMGYwMzJlYTAwYzYiLCJ3aXNobGlzdElkIjoiZjc0MTBkNTAtMzY0My00ZTZlLTkxMTctZjczYTExNjMxMTE4IiwiYWNjb3VudCI6eyJhY2NvdW50SWQiOiIyZDgzZjQ3MC1mYjU5LTRmOWUtYWI3MS1kZDI3YjMwZWYyNjYiLCJlbWFpbCI6ImphbmUuZG9lQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiYmlydGhkYXkiOiIxOTc0LTA5LTIwVDAwOjAwOjAwLjAwMFoiLCJjb25maXJtZWQiOnRydWUsImFkZHJlc3NlcyI6W3siYWRkcmVzc0lkIjoiSWdkZzZrbnYiLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJzdHJlZXROYW1lIjoiRmlyc3QgU3RyZWV0Iiwic3RyZWV0TnVtYmVyIjoiMTIiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiRXhhbXBsZSBDaXR5IiwiY291bnRyeSI6IlVTIiwicGhvbmUiOiIrMzEyMzQ1Njc4IiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOmZhbHNlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOmZhbHNlfSx7ImFkZHJlc3NJZCI6Imltd25SUFJGIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwic3RyZWV0TmFtZSI6IlRoaXJkIFN0cmVldCIsInN0cmVldE51bWJlciI6IjM0IiwicG9zdGFsQ29kZSI6IjEyMzQ1IiwiY2l0eSI6IkV4YW1wbGUgQ2l0eSIsImNvdW50cnkiOiJOTCIsInBob25lIjoiKzMxMTIzNDU2NzgiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6dHJ1ZSwiaXNEZWZhdWx0U2hpcHBpbmdBZGRyZXNzIjp0cnVlfSx7ImFkZHJlc3NJZCI6IlplYTMwTXVpIiwiZmlyc3ROYW1lIjoiU2ltZW9uZSIsImxhc3ROYW1lIjoiRWxzZSIsInN0cmVldE5hbWUiOiJVbm5hbWVkc3RyIiwic3RyZWV0TnVtYmVyIjoiMjM0IiwicG9zdGFsQ29kZSI6IjEyMzQ1IiwiY2l0eSI6IlRvd24iLCJjb3VudHJ5IjoiREUiLCJwaG9uZSI6IjEyNDMyNTM2NTQ2NDIzMTQzNTY3IiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOmZhbHNlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOmZhbHNlfV19fQ.dhkEkyM9HCwhdbf4YBPYSBFy2bqdmU1z0HK3raUVuz8";

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

  const lineItems: LineItem[] = [
    {
      name: "Product",
      kind: "debit",
      quantity: "6",
      unitAmount: "1.00",
      unitOfMeasure: "unit",
      totalAmount: "6.00",
      taxAmount: "0.00",
      discountAmount: "0.00",
      productCode: "54321",
      commodityCode: "98765",
    },
  ];

  const shipping: Shipping = {
    firstName: "Majid",
    lastName: "Abbasi",
  };

  const shippingOptions: PayPalShippingOptions[] = [
    {
      amount: 3.0,
      countryCode: "DE",
    },
    {
      amount: 4.0,
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
    taxAmount: "0.00",
    shippingAmount: "0.00",
    discountAmount: "0.00",
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
  };

  const vaultingParams = {
    createPaymentForVault: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPaymentForVault`,
    vaultPaymentMethodUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/vaultPaymentMethod`,
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
        //shippingOptions={shippingOptions}
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
    CreditCardVault: <CreditCardVault {...params} {...vaultingParams} />,
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
        {...vaultingParams}
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
