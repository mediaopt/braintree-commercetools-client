import { LocalPaymentMethod } from "../../src/components/LocalPaymentMethods/LocalPaymentMethod";
import { params, localPaymentParams, requestHeader } from "./constants";

export default {
  title: "Components/LocalPayments",
  component: LocalPaymentMethod,
};

export const Bancontact = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "bancontact",
    countryCode: "BE",
    requestHeader,
  },
};

export const BLIK = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "PLN",
    paymentType: "blik",
    countryCode: "PL",
    requestHeader,
  },
};

export const EPS = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "EPS",
    countryCode: "AT",
    requestHeader,
  },
};

export const Giropay = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "giropay",
    countryCode: "DE",
    requestHeader,
  },
};

export const Grabpay = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "SGD",
    paymentType: "grabpay",
    countryCode: "SG",
    requestHeader,
  },
};

export const iDeal = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "ideal",
    countryCode: "NL",
    requestHeader,
  },
};

export const Sofort = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "sofort",
    countryCode: "DE",
    requestHeader,
  },
  argTypes: {
    currencyCode: {
      options: ["EUR", "GBP"],
      control: { type: "select" },
    },
    countryCode: {
      options: ["AT", "BE", "DE", "IT", "NL", "ES", "GB"],
      control: { type: "select" },
    },
  },
};
export const MyBank = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "sofort",
    countryCode: "IT",
    requestHeader,
  },
};
export const P24 = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "p24",
    countryCode: "PL",
    requestHeader,
  },
  argTypes: {
    currencyCode: {
      options: ["EUR", "PLN"],
      control: { type: "select" },
    },
  },
};
