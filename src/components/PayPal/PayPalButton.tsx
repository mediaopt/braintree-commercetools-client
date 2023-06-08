import React, { useEffect } from "react";

import { usePayment } from "../../app/usePayment";
import { PayButtonProps, PAY_BUTTON_TEXT_FALLBACK } from "../PayButton";

import { PayPalMask } from "./PayPalMask";

import { PayPalProps } from "../../types";

type PayPalButtonProps = PayPalProps & PayButtonProps;

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  disabled,
  fullWidth = true,
  buttonText,
  flow,
  buttonLabel,
  buttonColor,
}) => {
  const { clientToken, handleGetClientToken } = usePayment();

  useEffect(() => {
    if (disabled) return;

    handleGetClientToken();
  }, [disabled]);

  return clientToken ? (
    <PayPalMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      flow={flow}
      buttonLabel={buttonLabel}
      buttonColor={buttonColor}
    />
  ) : (
    <></>
  );
};
