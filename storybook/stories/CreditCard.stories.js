import { CreditCard } from "../../src/components/CreditCard";
import { params, vaultingParams } from "./constants";

export default {
  title: "Components/CreditCard",
  component: CreditCard,
};

export const Main = {
  args: {
    ...params,
    enableVaulting: false,
  },
};

export const Vaulting = {
  args: {
    ...params,
    enableVaulting: true,
  },
};

export const PureVaulting = {
  args: {
    ...params,
    ...vaultingParams,
  },
};
