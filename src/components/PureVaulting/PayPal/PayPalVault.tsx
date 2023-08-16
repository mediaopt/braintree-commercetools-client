import React from "react";
import { RenderTemplate } from "../../RenderTemplate";
import { GeneralComponentsProps, PayPalProps } from "../../../types";
import { PayPalVaultButton } from "./PayPalVaultButton";
import { FlowType, Intent } from "paypal-checkout-components";

type PayPalComponentProps = PayPalProps & GeneralComponentsProps;

export const PayPalVault: React.FC<PayPalComponentProps> = ({
  getClientTokenUrl,
  createPaymentUrl,
  createFakePaymentUrl,
  purchaseUrl,
  vaultPaymentMethodUrl,
  sessionKey,
  cartInformation,
  sessionValue,
  purchaseCallback,
  buttonColor,
  buttonLabel,
  fullWidth,
  buttonText,
  locale = "en_GB",
  intent = "capture" as Intent,
  commit = true,
  shipping,
  shape,
  size,
  tagline,
  height,
  billingAgreementDescription,
  enableShippingAddress,
  shippingAddressEditable,
  shippingAddressOverride,
}) => {
  return (
    <RenderTemplate
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      createFakePaymentUrl={createFakePaymentUrl}
      purchaseUrl={purchaseUrl}
      vaultPaymentMethodUrl={vaultPaymentMethodUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
    >
      <PayPalVaultButton
        disabled={false}
        buttonText={buttonText}
        fullWidth={fullWidth}
        flow={"vault" as FlowType}
        buttonColor={buttonColor}
        buttonLabel={buttonLabel}
        locale={locale}
        intent={intent}
        commit={commit}
        shipping={shipping}
        shape={shape}
        size={size}
        tagline={tagline}
        height={height}
        billingAgreementDescription={billingAgreementDescription}
        enableShippingAddress={enableShippingAddress}
        shippingAddressEditable={shippingAddressEditable}
        shippingAddressOverride={shippingAddressOverride}
      />
    </RenderTemplate>
  );
};
