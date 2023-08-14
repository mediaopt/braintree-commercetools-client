import React from "react";

import { usePayment } from "../../app/usePayment";
import { PayButtonProps } from "../PayButton";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";

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
  lineItems,
  shipping,
}: GooglePayButtonProps) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(disabled);

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
      lineItems={lineItems}
      shipping={shipping}
    />
  ) : (
    <></>
  );
};
