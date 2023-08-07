import { LocalPaymentMethod } from "../../src/components/LocalPaymentMethods/LocalPaymentMethod";
import { params, localPaymentParams } from "./constants";

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
  },
};

export const BLIK = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "PLN",
    paymentType: "blik",
    countryCode: "PL",
  },
};

export const EPS = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "EPS",
    countryCode: "AT",
  },
};

export const Giropay = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "giropay",
    countryCode: "DE",
  },
};

export const Grabpay = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "SGD",
    paymentType: "grabpay",
    countryCode: "SG",
  },
};

export const iDeal = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "ideal",
    countryCode: "NL",
  },
};

export const Sofort = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "sofort",
    countryCode: "DE",
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
  },
};
export const P24 = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "p24",
    countryCode: "PL",
  },
  argTypes: {
    currencyCode: {
      options: ["EUR", "PLN"],
      control: { type: "select" },
    },
  },
};
