import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { VenmoButton } from "./VenmoButton";

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
  ignoreBowserSupport,
  shippingMethodId,
}: VenmoProps) => {
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
        ignoreBowserSupport={ignoreBowserSupport}
      />
    </RenderTemplate>
  );
};
