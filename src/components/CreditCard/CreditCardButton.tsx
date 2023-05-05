import React from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";

export const CreditCardButton: React.FC = () => {
  const { handleGetClientToken, clientToken } = usePayment();

  return clientToken ? (
      <CreditCardMask />
  ) : (
    <button onClick={handleGetClientToken}>Get Client Token</button>
  );
};
