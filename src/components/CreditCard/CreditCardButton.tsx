import React from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";
import {
  PayButton,
  PAY_BUTTON_TEXT_FALLBACK,
  PayButtonProps,
} from "../PayButton";

import {
  ThreeDSecureAdditionalInformation,
  ThreeDSecureBillingAddress,
} from "braintree-web/modules/three-d-secure";

type CreditCardButton = {
  showPostalCode: boolean;
  showCardHoldersName: boolean;
  threeDSBillingAddress?: ThreeDSecureBillingAddress;
  threeDSAdditionalInformation?: ThreeDSecureAdditionalInformation;
  email?: string;
} & PayButtonProps;

export const CreditCardButton: React.FC<CreditCardButton> = ({
  disabled,
  fullWidth = true,
  buttonText,
  showPostalCode,
  showCardHoldersName,
  email,
  threeDSAdditionalInformation,
  threeDSBillingAddress,
}) => {
  const { clientToken } = usePayment();

  return clientToken ? (
    <CreditCardMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      showPostalCode={showPostalCode}
      showCardHoldersName={showCardHoldersName}
      email={email}
      threeDSAdditionalInformation={threeDSAdditionalInformation}
      threeDSBillingAddress={threeDSBillingAddress}
    />
  ) : (
    <PayButton
      fullWidth={fullWidth}
      disabled={disabled}
      buttonText={buttonText}
    />
  );
};
