import React from "react";

import { usePayment } from "../../app/usePayment";
import {
  PayButton,
  PayButtonProps,
  PAY_BUTTON_TEXT_FALLBACK,
} from "../PayButton";

import { VenmoMask } from "./VenmoMask";
import { VenmoTypes } from "../../types";
type VenmoButton = VenmoTypes & PayButtonProps;

export const VenmoButton: React.FC<VenmoButton> = ({
  disabled,
  fullWidth = true,
  buttonText,
  desktopFlow,
  paymentMethodUsage,
  mobileWebFallBack,
  allowNewBrowserTab,
  profile_id,
  useTestNonce,
  setVenmoUserName,
}: VenmoButton) => {
  const { clientToken } = usePayment();

  return clientToken ? (
    <VenmoMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      mobileWebFallBack={mobileWebFallBack}
      desktopFlow={desktopFlow}
      paymentMethodUsage={paymentMethodUsage}
      allowNewBrowserTab={allowNewBrowserTab}
      profile_id={profile_id}
      useTestNonce={useTestNonce}
      setVenmoUserName={setVenmoUserName}
    />
  ) : (
    <PayButton
      fullWidth={fullWidth}
      disabled={disabled}
      buttonText={buttonText}
    />
  );
};
