import React from "react";
import { RenderTemplate } from "../../RenderTemplate";
import { GeneralComponentsProps, GeneralCreditCardProps } from "../../../types";
import { CreditCardVaultButton } from "./CreditCardVaultButton";

type CreditCardProps = GeneralComponentsProps & GeneralCreditCardProps;

export const CreditCardVault: React.FC<CreditCardProps> = ({
  getClientTokenUrl,
  createPaymentUrl,
  purchaseUrl,
  sessionValue,
  sessionKey,
  purchaseCallback,
  cartInformation,
}) => {
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
      <CreditCardVaultButton />
    </RenderTemplate>
  );
};
