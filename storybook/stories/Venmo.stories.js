import { Venmo } from "../../src/components/Venmo";
import { params } from "./constants";

export default {
  title: "Components/Venmo",
  component: Venmo,
};

export const Main = {
  args: {
    ...params,
    desktopFlow: "desktopWebLogin",
    mobileWebFallBack: true,
    paymentMethodUsage: "multi_use",
    useTestNonce: true,
    setVenmoUserName: (venmoName) => console.log(venmoName),
    ignoreBowserSupport: true,
  },
};
