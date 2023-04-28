import React, { useEffect } from "react";

import { usePayment } from "../../app/usePayment";

export const CreditCardButton: React.FC = () => {
  const { handleGetClientToken, handlePurchase, clientToken } = usePayment();

  return clientToken ? (
    <button onClick={handlePurchase}>Purchase</button>
  ) : (
    <button onClick={handleGetClientToken}>Get Client Token</button>
  );
};
