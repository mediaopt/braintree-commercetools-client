import React from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";

export const CreditCardButton: React.FC<{ disabled: boolean }> = ({
  disabled,
}) => {
  const { handleGetClientToken, clientToken } = usePayment();

  return clientToken ? (
    <CreditCardMask />
  ) : (
    <button
      className="justify-center align-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600  shadow-sm"
      onClick={handleGetClientToken}
      disabled={disabled}
    >
      Pay
    </button>
  );
};
