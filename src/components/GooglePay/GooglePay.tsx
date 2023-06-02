import React from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../RenderPurchase";
import { GooglePayButton } from "./GooglePayButton";

import { isPayButtonDisabled } from "../PayButton";

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
}: GooglePayComponentProps) => {
  return (
    <PaymentProvider
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      purchaseUrl={purchaseUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
    >
      <NotificationsProvider>
        <RenderPurchase>
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
          />
        </RenderPurchase>
      </NotificationsProvider>
    </PaymentProvider>
  );
};
