import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { ApplePayButton } from "./ApplePayButton";

import { GeneralComponentsProps, ApplePayTypes } from "../../types";

type ApplePayComponentProps = ApplePayTypes & GeneralComponentsProps;

export const ApplePay: React.FC<ApplePayComponentProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  applePayDisplayName,
  lineItems,
  shipping,
  taxAmount,
  shippingAmount,
  discountAmount,
  shippingMethodId,
}: ApplePayComponentProps) => {
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
      shippingMethodId={shippingMethodId}
    >
      <ApplePayButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        applePayDisplayName={applePayDisplayName}
        lineItems={lineItems}
        shipping={shipping}
        shippingMethodId={shippingMethodId}
      />
    </RenderTemplate>
  );
};
