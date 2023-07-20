import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { LocalPaymentMethodButton } from "./LocalPaymentMethodButton";

import { GeneralComponentsProps, LocalPaymentMethodsType } from "../../types";

type LocalPaymentMethodType = GeneralComponentsProps & LocalPaymentMethodsType;

export const LocalPaymentMethod: React.FC<LocalPaymentMethodType> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  paymentType,
  countryCode,
  currencyCode,
  fullWidth,
  merchantAccountId,
  fallbackUrl,
  fallbackButtonText,
  shippingAddressRequired,
}: LocalPaymentMethodType) => {
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
      <LocalPaymentMethodButton
        paymentType={paymentType}
        countryCode={countryCode}
        currencyCode={currencyCode}
        disabled={isPayButtonDisabled(cartInformation)}
        fullWidth={fullWidth}
        merchantAccountId={merchantAccountId}
        fallbackUrl={fallbackUrl}
        fallbackButtonText={fallbackButtonText}
        shippingAddressRequired={shippingAddressRequired}
      />
    </RenderTemplate>
  );
};
