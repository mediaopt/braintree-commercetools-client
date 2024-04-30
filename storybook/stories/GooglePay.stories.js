import { GooglePay } from "../../src/components/GooglePay";
import { params, requestHeader } from "./constants";

export default {
  title: "Components/GooglePay",
  component: GooglePay,
};

export const Main = {
  args: {
    ...params,
    totalPriceStatus: "FINAL",
    googleMerchantId: "merchant-id-from-google",
    acquirerCountryCode: "DE",
    environment: "TEST",
    requestHeader,
  },
};
