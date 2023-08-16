import React from "react";
import { usePayment } from "../../../app/usePayment";
import { useHandleGetClientToken } from "../../../app/useHandleGetClientToken";
import { CreditCardVaultMask } from "./CreditCardVaultMask";

export const CreditCardVaultButton: React.FC = ({}) => {
  const { clientToken } = usePayment();

  useHandleGetClientToken(false, undefined, true);

  return clientToken ? <CreditCardVaultMask /> : <></>;
};
