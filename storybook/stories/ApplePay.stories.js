import { ApplePay } from "../../src/components/ApplePay";
import { params, requestHeader } from "./constants";

export default {
  title: "Components/ApplePay",
  component: ApplePay,
};

export const Main = {
  args: {
    ...params,
    applePayDisplayName: "My Store",
    requestHeader,
  },
};
