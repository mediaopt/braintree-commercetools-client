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
  fullWidth,
  buttonText,
  showPostalCode = false,
  fullCartAmount,
  email,
  threeDSBillingAddress,
  threeDSAdditionalInformation,
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
      fullCartAmount={fullCartAmount}
    >
      <RenderPurchase>
        <CreditCardButton
          disabled={
            !cartInformation.account ||
            !cartInformation.billing ||
            !cartInformation.shipping
          }
          fullCartAmount={fullCartAmount}
          buttonText={buttonText}
          fullWidth={fullWidth}
          showPostalCode={showPostalCode}
          email={email}
          threeDSBillingAddress={threeDSBillingAddress}
          threeDSAdditionalInformation={threeDSAdditionalInformation}
        />
      </RenderPurchase>
    </PaymentProvider>
  );
};
