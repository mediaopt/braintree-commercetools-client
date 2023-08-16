import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { CreditCardButton } from "./CreditCardButton";

import { GeneralComponentsProps, GeneralCreditCardProps } from "../../types";

type CreditCardProps = GeneralComponentsProps & GeneralCreditCardProps;

export const CreditCard: React.FC<CreditCardProps> = ({
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
  showCardHoldersName = false,
  threeDSBillingAddress,
  threeDSAdditionalInformation,
  enableVaulting,
  continueOnLiabilityShiftPossible,
  continueOnNoThreeDS,
  shippingMethodId,
}: CreditCardProps) => {
  return (
    <RenderTemplate
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      purchaseUrl={purchaseUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
      shippingMethodId={shippingMethodId}
    >
      <CreditCardButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        showPostalCode={showPostalCode}
        showCardHoldersName={showCardHoldersName}
        threeDSBillingAddress={threeDSBillingAddress}
        threeDSAdditionalInformation={threeDSAdditionalInformation}
        enableVaulting={enableVaulting}
        continueOnLiabilityShiftPossible={continueOnLiabilityShiftPossible}
        continueOnNoThreeDS={continueOnNoThreeDS}
        shippingMethodId={shippingMethodId}
      />
    </RenderTemplate>
  );
};
