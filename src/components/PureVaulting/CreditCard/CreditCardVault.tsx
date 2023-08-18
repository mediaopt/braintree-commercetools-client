import React from "react";
import { RenderTemplate } from "../../RenderTemplate";
import { GeneralComponentsProps, GeneralCreditCardProps } from "../../../types";
import { CreditCardVaultButton } from "./CreditCardVaultButton";

type CreditCardProps = GeneralComponentsProps & GeneralCreditCardProps;

export const CreditCardVault: React.FC<CreditCardProps> = ({
  getClientTokenUrl,
  createPaymentForVault,
  createPaymentUrl,
  vaultPaymentMethodUrl,
  purchaseUrl,
  sessionValue,
  sessionKey,
  purchaseCallback,
  cartInformation,
  fullWidth = true,
  buttonText,
  showPostalCode,
  showCardHoldersName,
}) => {
  return (
    <RenderTemplate
      getClientTokenUrl={getClientTokenUrl}
      createPaymentUrl={createPaymentUrl}
      createPaymentForVault={createPaymentForVault}
      purchaseUrl={purchaseUrl}
      vaultPaymentMethodUrl={vaultPaymentMethodUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      purchaseCallback={purchaseCallback}
      cartInformation={cartInformation}
    >
      <CreditCardVaultButton
        disabled={false}
        buttonText={buttonText}
        fullWidth={fullWidth}
        showPostalCode={showPostalCode}
        showCardHoldersName={showCardHoldersName}
      />
    </RenderTemplate>
  );
};
