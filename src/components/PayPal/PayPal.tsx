import React from "react";

import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../../components/RenderPurchase";

import { PayPalButton } from "./PayPalButton";
import { isPayButtonDisabled } from "../PayButton";

import { GeneralComponentsProps } from "../../types";

type PayPalProps = {
  flow: "vault" | "capture";
} & GeneralComponentsProps;

export const PayPal: React.FC<PayPalProps> = ({
  flow,
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
}: PayPalProps) => {
  return (
    <PaymentProvider
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      purchaseUrl={purchaseUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
    >
      <RenderPurchase>
        <PayPalButton
          disabled={isPayButtonDisabled(cartInformation)}
          buttonText={buttonText}
          fullWidth={fullWidth}
          flow={flow}
        />
      </RenderPurchase>
    </PaymentProvider>
  );
};
