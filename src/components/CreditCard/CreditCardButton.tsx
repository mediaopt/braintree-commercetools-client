import React, { useEffect } from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";

export const CreditCardButton: React.FC = () => {
  const { handleGetClientToken, handlePurchase, clientToken } = usePayment();

  return /*clientToken ?*/ (
      <CreditCardMask clientToken={'clientToken'}>
        <button onClick={handlePurchase}>Purchase</button>
      </CreditCardMask>

  )/* : (
    <button onClick={handleGetClientToken}>Get Client Token</button>
  )*/;
};
