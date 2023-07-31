import { PayPal } from "../../src/components/PayPal";
import { params } from "./constants";

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
  },
};

export const Main = {
  args: {
    ...params,
    flow: "checkout",
    buttonColor: "blue",
    buttonLabel: "pay",
    payLater: false,
    locale: "en_GB",
    intent: "capture",
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
  },
};
