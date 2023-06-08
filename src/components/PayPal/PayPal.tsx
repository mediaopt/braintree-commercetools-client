import React from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../../components/RenderPurchase";

import { PayPalButton } from "./PayPalButton";
import { isPayButtonDisabled } from "../PayButton";

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
    <NotificationsProvider>
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
            buttonColor={buttonColor}
            buttonLabel={buttonLabel}
          />
        </RenderPurchase>
      </PaymentProvider>
    </NotificationsProvider>
  );
};
