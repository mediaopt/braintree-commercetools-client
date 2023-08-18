import React from "react";
import { usePayment } from "../../../app/usePayment";
import { useHandleGetClientToken } from "../../../app/useHandleGetClientToken";
import { CreditCardMask } from "../../CreditCard/CreditCardMask";
import { GeneralCreditCardProps } from "../../../types";
import { VAULT_BUTTON_TEXT_FALLBACK, PayButtonProps } from "../../PayButton";

type CreditCardButton = GeneralCreditCardProps & PayButtonProps;

export const CreditCardVaultButton: React.FC<CreditCardButton> = ({
  fullWidth = true,
  buttonText,
  showPostalCode,
  showCardHoldersName,
}: CreditCardButton) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(false, undefined, undefined, true);

  return clientToken ? (
    <CreditCardMask
      fullWidth={fullWidth}
      buttonText={buttonText ?? VAULT_BUTTON_TEXT_FALLBACK}
      showPostalCode={showPostalCode}
      showCardHoldersName={showCardHoldersName}
      enableVaulting={false}
      isPureVault={true}
    />
  ) : (
    <></>
  );
};
