import React from "react";

import {
  ThreeDSecureAdditionalInformation,
  ThreeDSecureBillingAddress,
} from "braintree-web/modules/three-d-secure";

import { PaymentProvider } from "../../app/usePayment";
import { NotificationsProvider } from "../../app/useNotifications";
import { RenderPurchase } from "../RenderPurchase";

import { GeneralComponentsProps } from "../../types";
import { CreditCardButton } from "./CreditCardButton";
import { isPayButtonDisabled } from "../PayButton";
import { LoaderProvider } from "../../app/useLoader";

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
          </RenderPurchase>
        </PaymentProvider>
      </LoaderProvider>
    </NotificationsProvider>
  );
};
