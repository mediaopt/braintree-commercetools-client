import React from "react";
import {
  ThreeDSecureAdditionalInformation,
  ThreeDSecureBillingAddress,
} from "braintree-web/modules/three-d-secure";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { CreditCardButton } from "./CreditCardButton";

import { GeneralComponentsProps } from "../../types";

type CreditCardProps = GeneralComponentsProps & {
  showPostalCode?: boolean;
  showCardHoldersName?: boolean;
  threeDSBillingAddress?: ThreeDSecureBillingAddress;
  threeDSAdditionalInformation?: ThreeDSecureAdditionalInformation;
  email?: string;
};

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
  email,
  threeDSBillingAddress,
  threeDSAdditionalInformation,
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
    >
      <CreditCardButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        showPostalCode={showPostalCode}
        showCardHoldersName={showCardHoldersName}
        email={email}
        threeDSBillingAddress={threeDSBillingAddress}
        threeDSAdditionalInformation={threeDSAdditionalInformation}
      />
    </RenderTemplate>
  );
};
