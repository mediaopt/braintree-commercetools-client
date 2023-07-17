import React from "react";

import { usePayment } from "../../app/usePayment";
import { PAY_BUTTON_TEXT_FALLBACK, PayButtonProps } from "../PayButton";
import { LocalPaymentMethodsType } from "../../types";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { LocalPaymentMethodMask } from "./LocalPaymentMethodMask";

type LocalPaymentMethod = LocalPaymentMethodsType & PayButtonProps;

export const LocalPaymentMethodButton: React.FC<LocalPaymentMethod> = ({
  disabled,
  fullWidth = true,
  buttonText = PAY_BUTTON_TEXT_FALLBACK,
  paymentType,
  currencyCode,
  countryCode,
  merchantAccountId,
  fallbackUrl,
  fallbackButtonText = PAY_BUTTON_TEXT_FALLBACK,
}: LocalPaymentMethod) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(disabled);

  return clientToken ? (
    <LocalPaymentMethodMask
      paymentType={paymentType}
      countryCode={countryCode}
      currencyCode={currencyCode}
      fullWidth={fullWidth}
      buttonText={buttonText}
      merchantAccountId={merchantAccountId}
      fallbackUrl={fallbackUrl}
      fallbackButtonText={fallbackButtonText}
    />
  ) : (
    <></>
  );
};
