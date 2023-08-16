import React from "react";

import { Intent } from "paypal-checkout-components";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { PayPalButton } from "./PayPalButton";

import { GeneralComponentsProps, PayPalProps } from "../../types";

type PayPalComponentProps = PayPalProps & GeneralComponentsProps;

export const PayPal: React.FC<PayPalComponentProps> = ({
  flow,
  buttonColor,
  buttonLabel,
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  payLater,
  payLaterButtonColor,
  locale = "en_GB",
  intent = "capture" as Intent,
  commit = true,
  enableShippingAddress = true,
  shippingAddressEditable = false,
  billingAgreementDescription = "",
  shippingAddressOverride,
  useKount,
  lineItems,
  shipping,
  shape,
  size,
  tagline,
  height,
  shippingOptions,
  taxAmount,
  shippingAmount,
  discountAmount,
  shippingMethodId,
}: PayPalComponentProps) => {
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
      <PayPalButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        flow={flow}
        buttonColor={buttonColor}
        buttonLabel={buttonLabel}
        payLater={payLater}
        payLaterButtonColor={payLaterButtonColor}
        locale={locale}
        intent={intent}
        commit={commit}
        enableShippingAddress={enableShippingAddress}
        billingAgreementDescription={billingAgreementDescription}
        shippingAddressEditable={shippingAddressEditable}
        shippingAddressOverride={shippingAddressOverride}
        useKount={useKount}
        lineItems={lineItems}
        shipping={shipping}
        shape={shape}
        size={size}
        tagline={tagline}
        height={height}
        shippingOptions={shippingOptions}
        shippingMethodId={shippingMethodId}
      />
    </RenderTemplate>
  );
};
