import React from "react";

import { PaymentProvider } from "../../app/usePayment";
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
      <RenderPurchase>
        <CreditCardButton
          disabled={
            !cartInformation.account ||
            !cartInformation.billing ||
            !cartInformation.shipping
          }
        />
      </RenderPurchase>
    </PaymentProvider>
  );
};
