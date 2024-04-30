import { CreditCard } from "../../src/components/CreditCard";
import { params, vaultingParams, requestHeader } from "./constants";

export default {
  title: "Components/CreditCard",
  component: CreditCard,
};

export const Main = {
  args: {
    ...params,
    enableVaulting: false,
    requestHeader,
  },
};

export const Vaulting = {
  args: {
    ...params,
    enableVaulting: true,
    requestHeader,
  },
};

export const PureVaulting = {
  args: {
    ...params,
    ...vaultingParams,
    requestHeader,
  },
};
