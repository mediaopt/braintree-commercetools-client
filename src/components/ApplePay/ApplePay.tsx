import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { ApplePayButton } from "./ApplePayButton";

import { GeneralComponentsProps, ApllePayTypes } from "../../types";

type ApplePayComponentProps = ApllePayTypes & GeneralComponentsProps;

export const ApplePay: React.FC<ApplePayComponentProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  apllePayDisplayName,
}: ApplePayComponentProps) => {
  return (
    <RenderTemplate
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      purchaseUrl={purchaseUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
    >
      <ApplePayButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        apllePayDisplayName={apllePayDisplayName}
      />
    </RenderTemplate>
  );
};
