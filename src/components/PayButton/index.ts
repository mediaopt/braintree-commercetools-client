export { PayButton, PAY_BUTTON_TEXT_FALLBACK } from "./PayButton";

import { CartInformation } from "../../types";

export type { PayButtonProps } from "./PayButton";

export const isPayButtonDisabled = (cartInformation: CartInformation) =>
  !cartInformation.account ||
  !cartInformation.billing ||
  !cartInformation.shipping;
