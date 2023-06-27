import React from "react";

import { usePayment } from "../../app/usePayment";
import { PayButtonProps, PAY_BUTTON_TEXT_FALLBACK } from "../PayButton";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";

import { CartInformationProps } from "../../types";

import { ACHMask } from "./ACHMask";

type ACHButtonProps = PayButtonProps & CartInformationProps;

export const ACHButton: React.FC<ACHButtonProps> = ({
  disabled,
  fullWidth = true,
  buttonText,
  cartInformation,
}: ACHButtonProps) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(disabled);

  return clientToken ? (
    <ACHMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      cartInformation={cartInformation}
    />
  ) : (
    <></>
  );
};
