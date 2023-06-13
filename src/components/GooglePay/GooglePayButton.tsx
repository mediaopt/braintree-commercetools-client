import React, { useEffect } from "react";

import { usePayment } from "../../app/usePayment";
import { PayButtonProps } from "../PayButton";

import { GooglePayMask } from "./GooglePayMask";
import { GooglePayTypes } from "../../types";

type GooglePayButtonProps = GooglePayTypes & PayButtonProps;

export const GooglePayButton: React.FC<GooglePayButtonProps> = ({
  disabled,
  fullWidth = true,
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
  const { clientToken, handleGetClientToken } = usePayment();

  useEffect(() => {
    if (disabled) return;

    handleGetClientToken();
  }, [disabled]);

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
      fullWidth={fullWidth}
    />
  ) : (
    <></>
  );
};
