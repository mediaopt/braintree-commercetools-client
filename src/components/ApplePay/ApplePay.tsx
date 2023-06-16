import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { ApplePayButton } from "./ApplePayButton";

import { GeneralComponentsProps } from "../../types";

type GooglePayComponentProps = GeneralComponentsProps;

export const ApplePay: React.FC<GooglePayComponentProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
}: GooglePayComponentProps) => {
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
      />
    </RenderTemplate>
  );
};
