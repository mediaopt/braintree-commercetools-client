import React from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../RenderPurchase";
import { LoaderProvider } from "../../app/useLoader";

import { PayPalButton } from "./PayPalButton";
import { isPayButtonDisabled } from "../PayButton";

import { GeneralComponentsProps } from "../../types";

type PayPalProps = {
  flow: "vault" | "checkout";
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
    <NotificationsProvider>
      <LoaderProvider>
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
      </LoaderProvider>
    </NotificationsProvider>
  );
};
