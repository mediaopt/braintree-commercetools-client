import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { LocalPaymentMethodButton } from "./LocalPaymentMethodButton";

import {
  GeneralComponentsProps,
  LocalPaymentComponentsProp,
  LocalPaymentMethodsType,
} from "../../types";

type LocalPaymentMethodType = GeneralComponentsProps &
  LocalPaymentComponentsProp &
  LocalPaymentMethodsType;

export const LocalPaymentMethod: React.FC<LocalPaymentMethodType> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  saveLocalPaymentIdUrl,
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
  useKount,
  lineItems,
  shipping,
  taxAmount,
  shippingAmount,
  discountAmount,
  shippingMethodId,
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
      taxAmount={taxAmount}
      shippingAmount={shippingAmount}
      discountAmount={discountAmount}
      shippingMethodId={shippingMethodId}
    >
      <LocalPaymentMethodButton
        saveLocalPaymentIdUrl={saveLocalPaymentIdUrl}
        paymentType={paymentType}
        countryCode={countryCode}
        currencyCode={currencyCode}
        disabled={isPayButtonDisabled(cartInformation)}
        fullWidth={fullWidth}
        merchantAccountId={merchantAccountId}
        fallbackUrl={fallbackUrl}
        fallbackButtonText={fallbackButtonText}
        shippingAddressRequired={shippingAddressRequired}
        useKount={useKount}
        lineItems={lineItems}
        shipping={shipping}
        shippingMethodId={shippingMethodId}
      />
    </RenderTemplate>
  );
};
