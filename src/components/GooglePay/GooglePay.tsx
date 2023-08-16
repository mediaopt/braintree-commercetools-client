import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { GooglePayButton } from "./GooglePayButton";

import { GeneralComponentsProps, GooglePayTypes } from "../../types";

type GooglePayComponentProps = GeneralComponentsProps & GooglePayTypes;

export const GooglePay: React.FC<GooglePayComponentProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  environment,
  googleMerchantId,
  totalPriceStatus,
  buttonTheme,
  buttonType,
  billingAddressFormat,
  billingAddressRequired,
  phoneNumberRequired,
  acquirerCountryCode,
  lineItems,
  shipping,
  taxAmount,
  shippingAmount,
  discountAmount,
}: GooglePayComponentProps) => {
  return (
    <RenderTemplate
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      purchaseUrl={purchaseUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
      taxAmount={taxAmount}
      shippingAmount={shippingAmount}
      discountAmount={discountAmount}
    >
      <GooglePayButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        googleMerchantId={googleMerchantId}
        totalPriceStatus={totalPriceStatus}
        environment={environment}
        buttonType={buttonType}
        buttonTheme={buttonTheme}
        billingAddressFormat={billingAddressFormat}
        billingAddressRequired={billingAddressRequired}
        phoneNumberRequired={phoneNumberRequired}
        acquirerCountryCode={acquirerCountryCode}
        lineItems={lineItems}
        shipping={shipping}
      />
    </RenderTemplate>
  );
};
