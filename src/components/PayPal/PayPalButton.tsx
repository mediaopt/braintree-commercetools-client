import React from "react";

import { usePayment } from "../../app/usePayment";
import {
  PayButton,
  PayButtonProps,
  PAY_BUTTON_TEXT_FALLBACK,
} from "../PayButton";

import { PayPalMask } from "./PayPalMask";

export const PayPalButton: React.FC<PayButtonProps> = ({
  disabled,
  fullWidth = true,
  buttonText,
}) => {
  const { clientToken } = usePayment();

  return clientToken ? (
    <PayPalMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
    />
  ) : (
    <PayButton
      fullWidth={fullWidth}
      disabled={disabled}
      buttonText={buttonText}
    />
  );
};
