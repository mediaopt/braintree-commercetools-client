import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { PayPalButton } from "./PayPalButton";

import { GeneralComponentsProps, PayPalProps } from "../../types";

type PayPalComponentProps = PayPalProps & GeneralComponentsProps;

export const PayPal: React.FC<PayPalComponentProps> = ({
  flow,
  buttonColor,
  buttonLabel,
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
}: PayPalComponentProps) => {
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
      <PayPalButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        flow={flow}
        buttonColor={buttonColor}
        buttonLabel={buttonLabel}
      />
    </RenderTemplate>
  );
};
