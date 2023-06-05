import React from "react";

import { usePayment } from "../../app/usePayment";
import {
  PayButton,
  PayButtonProps,
  PAY_BUTTON_TEXT_FALLBACK,
} from "../PayButton";

import { GooglePayMask } from "./GooglePayMask";
import { GooglePayTypes } from "../../types";

type GooglePayButtonProps = GooglePayTypes & PayButtonProps;

export const GooglePayButton: React.FC<GooglePayButtonProps> = ({
  disabled,
  fullWidth = true,
  buttonText,
  googleMerchantId,
  environment,
  totalPriceStatus,
  buttonType,
  buttonTheme,
  billingAddressFormat,
  billingAddressRequired,
  phoneNumberRequired,
  acquirerCountryCode,
}: GooglePayButtonProps) => {
  const { clientToken } = usePayment();

  return clientToken ? (
    <GooglePayMask
      environment={environment}
      totalPriceStatus={totalPriceStatus}
      googleMerchantId={googleMerchantId}
      buttonTheme={buttonTheme}
      buttonType={buttonType}
      billingAddressRequired={billingAddressRequired}
      billingAddressFormat={billingAddressFormat}
      phoneNumberRequired={phoneNumberRequired}
      acquirerCountryCode={acquirerCountryCode}
    />
  ) : (
    <PayButton
      fullWidth={fullWidth}
      disabled={disabled}
      buttonText={buttonText}
    />
  );
};
