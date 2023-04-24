import React from "react";

import { TokenProvider } from "../../app/useToken";
import { RenderPurchase } from "../../components/RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const CreditCard: React.FC<GeneralComponentsProps> = ({
  getClientTokenUrl,
  paymentId,
  paymentVersion,
}: GeneralComponentsProps) => {
  return (
    <TokenProvider
      getClientTokenUrl={getClientTokenUrl}
      paymentId={paymentId}
      paymentVersion={paymentVersion}
    >
      <RenderPurchase>
        <button>Purchase</button>
      </RenderPurchase>
    </TokenProvider>
  );
};
