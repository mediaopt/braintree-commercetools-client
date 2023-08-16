import React from "react";
import { usePayment } from "../../../app/usePayment";
import { useHandleGetClientToken } from "../../../app/useHandleGetClientToken";
import { PayPalVaultMask } from "./PayPalVaultMask";
import { PayPalProps } from "../../../types";
import { PAY_BUTTON_TEXT_FALLBACK, PayButtonProps } from "../../PayButton";

type PayPalButtonProps = PayPalProps & PayButtonProps;

export const PayPalVaultButton: React.FC<PayPalButtonProps> = ({
  fullWidth = true,
  buttonText,
  flow,
  buttonLabel,
  buttonColor,
  locale,
  intent,
  commit,
  shape,
  size,
  tagline,
  height,
  billingAgreementDescription,
  enableShippingAddress,
  shippingAddressEditable,
  shippingAddressOverride,
}) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(false, undefined, true);

  return clientToken ? (
    <PayPalVaultMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? PAY_BUTTON_TEXT_FALLBACK}
      flow={flow}
      buttonLabel={buttonLabel}
      buttonColor={buttonColor}
      locale={locale}
      intent={intent}
      commit={commit}
      shape={shape}
      size={size}
      tagline={tagline}
      height={height}
      billingAgreementDescription={billingAgreementDescription}
      enableShippingAddress={enableShippingAddress}
      shippingAddressEditable={shippingAddressEditable}
      shippingAddressOverride={shippingAddressOverride}
    />
  ) : (
    <></>
  );
};
