import { PayPal } from "../../src/components/PayPal";
import { params, vaultingParams } from "./constants";

export default {
  title: "Components/PayPal",
  component: PayPal,
  argTypes: {
    buttonColor: {
      options: ["gold", "blue", "silver", "black", "white"],
      control: { type: "select" },
    },
    payLaterButtonColor: {
      options: ["gold", "blue", "silver", "black", "white"],
      control: { type: "select" },
    },
    flow: {
      options: ["checkout", "vault"],
      control: { type: "select" },
    },
    buttonLabel: {
      options: ["checkout", "credit", "pay", "buynow", "paypal"],
      control: { type: "select" },
    },
    intent: {
      options: ["capture", "order", "authorize"],
      control: { type: "select" },
    },
    shape: {
      options: ["pill", "rect"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large", "responsive"],
      control: { type: "select" },
    },
  },
};

const shippingOptions = [
  {
    amount: 1.0,
    countryCode: "DE",
  },
  {
    amount: 3.0,
    countryCode: "US",
  },
];

export const Main = {
  args: {
    ...params,
    flow: "checkout",
    buttonColor: "blue",
    buttonLabel: "pay",
    payLater: false,
    locale: "en_GB",
    intent: "capture",
    shape: "pill",
    size: "small",
    tagline: true,
    height: 55,
    shippingOptions: shippingOptions,
  },
};

export const PayLater = {
  args: {
    ...params,
    flow: "checkout",
    buttonColor: "blue",
    buttonLabel: "pay",
    payLaterButtonColor: "blue",
    payLater: true,
    locale: "en_GB",
    intent: "capture",
    shape: "pill",
    size: "small",
    tagline: true,
    height: 55,
    shippingOptions: shippingOptions,
  },
};

export const Vaulting = {
  args: {
    ...params,
    flow: "checkout",
    buttonColor: "blue",
    buttonLabel: "buynow",
    commit: true,
    payLater: false,
    locale: "en_GB",
    intent: "capture",
    enableShippingAddress: true,
    shippingAddressEditable: false,
    shape: "pill",
    size: "small",
    tagline: true,
    height: 55,
    shippingOptions: shippingOptions,
  },
};

export const PureVaulting = {
  args: {
    ...params,
    ...vaultingParams,
    flow: "vault",
    buttonColor: "blue",
    commit: true,
    payLater: false,
    locale: "en_GB",
    intent: "capture",
    shape: "pill",
    size: "small",
    tagline: true,
    height: 55,
  },
};
