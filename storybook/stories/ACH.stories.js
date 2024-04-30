import { ACH } from "../../src/components/ACH";
import { params, baseUrl, requestHeader } from "./constants";

export default {
  title: "Components/ACH",
  component: ACH,
};

export const Main = {
  args: {
    ...params,
    mandateText:
      'By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.',
    getAchVaultTokenURL: `${baseUrl}/payment/getAchVaultToken`,
    requestHeader,
  },
};
