import React from "react";

import { PaymentProvider } from "../../app/usePayment";
import { NotificationsProvider } from "../../app/useNotifications";
import { RenderPurchase } from "../../components/RenderPurchase";

import { GeneralComponentsProps } from "../../types";
import { CreditCardButton } from "./CreditCardButton";

export const CreditCard: React.FC<GeneralComponentsProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  showPostalCode = false,
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
          <CreditCardButton
            disabled={
              !cartInformation.account ||
              !cartInformation.billing ||
              !cartInformation.shipping
            }
            buttonText={buttonText}
            fullWidth={fullWidth}
            showPostalCode={showPostalCode}
          />
        </RenderPurchase>
      </NotificationsProvider>
    </PaymentProvider>
  );
};
