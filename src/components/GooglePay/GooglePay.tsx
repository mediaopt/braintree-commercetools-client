import React from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../RenderPurchase";
import { GooglePayButton } from "./GooglePayButton";

import { isPayButtonDisabled } from "../PayButton";

import { GeneralComponentsProps } from "../../types";

export const GooglePay: React.FC<GeneralComponentsProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
}: GeneralComponentsProps) => {
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
      <NotificationsProvider>
        <RenderPurchase>
          <GooglePayButton
            disabled={isPayButtonDisabled(cartInformation)}
            buttonText={buttonText}
            fullWidth={fullWidth}
          />
        </RenderPurchase>
      </NotificationsProvider>
    </PaymentProvider>
  );
};
