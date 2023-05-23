import React from "react";

import { usePayment } from "../../app/usePayment";
import { PayButton, PayButtonProps } from "../PayButton";

export const PayPalButton: React.FC<PayButtonProps> = ({
  disabled,
  fullWidth = true,
  buttonText,
}) => {
  const { clientToken } = usePayment();

  return clientToken ? (
    <>{clientToken}</>
  ) : (
    <PayButton
      fullWidth={fullWidth}
      disabled={disabled}
      buttonText={buttonText}
    />
  );
};
