import { ApplePay } from "../../src/components/ApplePay";
import { params } from "./constants";

export default {
  title: "Components/ApplePay",
  component: ApplePay,
};

export const Main = {
  args: {
    ...params,
    applePayDisplayName: "My Store",
  },
};
