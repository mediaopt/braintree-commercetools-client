import React from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../RenderPurchase";

import { VenmoButton } from "./VenmoButton";
import { isPayButtonDisabled } from "../PayButton";

import { GeneralComponentsProps, VenmoTypes } from "../../types";

export type VenmoProps = VenmoTypes & GeneralComponentsProps;

export const Venmo: React.FC<VenmoProps> = ({
  mobileWebFallBack,
  paymentMethodUsage,
  desktopFlow,
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  allowNewBrowserTab,
  profile_id,
  useTestNonce,
  setVenmoUserName,
}: VenmoProps) => {
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
          <VenmoButton
            disabled={isPayButtonDisabled(cartInformation)}
            buttonText={buttonText}
            fullWidth={fullWidth}
            mobileWebFallBack={mobileWebFallBack}
            desktopFlow={desktopFlow}
            paymentMethodUsage={paymentMethodUsage}
            allowNewBrowserTab={allowNewBrowserTab}
            profile_id={profile_id}
            useTestNonce={useTestNonce}
            setVenmoUserName={setVenmoUserName}
          />
        </RenderPurchase>
      </NotificationsProvider>
    </PaymentProvider>
  );
};
