import React from "react";

import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../../components/RenderPurchase";

import { GeneralComponentsProps } from "../../types";

type PayPalProps = {
  currency: string;
  amount: number;
  flow: "vault" | "capture";
} & GeneralComponentsProps;

export const PayPal: React.FC<PayPalProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
}: GeneralComponentsProps) => {
  return (
    <PaymentProvider
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      purchaseUrl={purchaseUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
    >
      <RenderPurchase>test</RenderPurchase>
    </PaymentProvider>
  );
};
