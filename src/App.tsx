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
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJmODRlNWI3Ni05ODE5LTQ1MTMtOTcxNC05NWE3ZDI2YzRhZTgiLCJ3aXNobGlzdElkIjoiYTcwM2IyYTUtZGM5MS00MWM5LTlkYTQtYWIxMTI3NTJjMDExIiwiYWNjb3VudCI6eyJhY2NvdW50SWQiOiIyZDgzZjQ3MC1mYjU5LTRmOWUtYWI3MS1kZDI3YjMwZWYyNjYiLCJlbWFpbCI6ImphbmUuZG9lQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiYmlydGhkYXkiOiIxOTc0LTA5LTIwVDAwOjAwOjAwLjAwMFoiLCJjb25maXJtZWQiOnRydWUsImFkZHJlc3NlcyI6W3siYWRkcmVzc0lkIjoiSWdkZzZrbnYiLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJzdHJlZXROYW1lIjoiRmlyc3QgU3RyZWV0Iiwic3RyZWV0TnVtYmVyIjoiMTIiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiRXhhbXBsZSBDaXR5IiwiY291bnRyeSI6IlVTIiwicGhvbmUiOiIrMzEyMzQ1Njc4IiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOnRydWUsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9LHsiYWRkcmVzc0lkIjoiaW13blJQUkYiLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJzdHJlZXROYW1lIjoiVGhpcmQgU3RyZWV0Iiwic3RyZWV0TnVtYmVyIjoiMzQiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiRXhhbXBsZSBDaXR5IiwiY291bnRyeSI6Ik5MIiwicGhvbmUiOiIrMzExMjM0NTY3OCIsImlzRGVmYXVsdEJpbGxpbmdBZGRyZXNzIjpmYWxzZSwiaXNEZWZhdWx0U2hpcHBpbmdBZGRyZXNzIjpmYWxzZX0seyJhZGRyZXNzSWQiOiJaZWEzME11aSIsImZpcnN0TmFtZSI6IlNpbWVvbmUiLCJsYXN0TmFtZSI6IkVsc2UiLCJzdHJlZXROYW1lIjoiVW5uYW1lZHN0ciIsInN0cmVldE51bWJlciI6IjIzNCIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJUb3duIiwiY291bnRyeSI6IkRFIiwicGhvbmUiOiIxMjQzMjUzNjU0NjQyMzE0MzU2NyIsImlzRGVmYXVsdEJpbGxpbmdBZGRyZXNzIjpmYWxzZSwiaXNEZWZhdWx0U2hpcHBpbmdBZGRyZXNzIjpmYWxzZX1dfX0.mSr-Tvf1nOJ4CrS3AjVSjS69i77vwFvKennaZ3Xw98o";

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
        {...params}
      />
    ),
    ApplePay: <ApplePay applePayDisplayName="My Store" {...params} />,
    ACH: (
      <ACH
        mandateText='By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.'
        getAchVaultTokenURL={`https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/getAchVaultToken`}
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
      />
    ),
    P24: (
      <P24
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        paymentType={"p24"}
        countryCode={"PL"}
      />
    ),
    Sofort: (
      <Sofort
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        paymentType={"sofort"}
        countryCode={"DE"}
      />
    ),
    BLIK: (
      <BLIK
        {...params}
        {...localPaymentParams}
        currencyCode={"PLN"}
        countryCode={"PL"}
        paymentType={"blik"}
      />
    ),
    MyBank: (
      <MyBank
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"IT"}
        paymentType={"mybank"}
      />
    ),
    EPS: (
      <EPS
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"AT"}
        paymentType={"eps"}
      />
    ),
    Giropay: (
      <Giropay
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"DE"}
        paymentType={"giropay"}
      />
    ),
    Grabpay: (
      <Grabpay
        {...params}
        {...localPaymentParams}
        currencyCode={"SGD"}
        countryCode={"SG"}
        paymentType={"grabpay"}
      />
    ),
    iDeal: (
      <IDeal
        {...params}
        {...localPaymentParams}
        currencyCode={"EUR"}
        countryCode={"NL"}
        paymentType={"ideal"}
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
