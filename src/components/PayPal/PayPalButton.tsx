import React from "react";

import { usePayment } from "../../app/usePayment";
import {
  PayButton,
  PayButtonProps,
  PAY_BUTTON_TEXT_FALLBACK,
} from "../PayButton";

import { PayPalMask } from "./PayPalMask";

type PayPalButtonProps = { flow: string } & PayButtonProps;

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  disabled,
  fullWidth = true,
  buttonText,
  flow,
}) => {
  const { clientToken } = usePayment();

  return clientToken ? (
    <PayPalMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      flow={flow}
    />
  ) : (
    <PayButton
      fullWidth={fullWidth}
      disabled={disabled}
      buttonText={buttonText}
    />
  );
};
