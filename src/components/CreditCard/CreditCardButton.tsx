import React from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";
import { PAY_BUTTON_TEXT_FALLBACK, PayButtonProps } from "../PayButton";
import { GeneralCreditCardProps } from "../../types";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";

type CreditCardButton = GeneralCreditCardProps & PayButtonProps;

export const CreditCardButton: React.FC<CreditCardButton> = ({
  disabled,
  fullWidth = true,
  buttonText,
  showPostalCode,
  showCardHoldersName,
  email,
  threeDSAdditionalInformation,
  threeDSBillingAddress,
  enableVaulting,
}: CreditCardButton) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(disabled);

  return clientToken ? (
    <CreditCardMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      showPostalCode={showPostalCode}
      showCardHoldersName={showCardHoldersName}
      email={email}
      threeDSAdditionalInformation={threeDSAdditionalInformation}
      threeDSBillingAddress={threeDSBillingAddress}
      enableVaulting={enableVaulting}
    />
  ) : (
    <></>
  );
};
