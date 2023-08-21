import { CreditCard } from "../../src/components/CreditCard";
import { params, vaultingParams } from "./constants";
import { CreditCardVault } from "../../src/components/PureVaulting/CreditCard";

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
  component: CreditCardVault,
  args: {
    ...params,
    ...vaultingParams,
  },
};
