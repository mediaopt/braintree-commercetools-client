import { LocalPaymentMethod } from "../../src/components/LocalPaymentMethods/LocalPaymentMethod";
import { params, localPaymentParams } from "./constants";

export default {
  title: "Components/LocalPayments",
  component: LocalPaymentMethod,
};

export const Main = {
  args: {
    ...params,
    ...localPaymentParams,
    currencyCode: "EUR",
    paymentType: "sofort",
    countryCode: "DE",
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
};
