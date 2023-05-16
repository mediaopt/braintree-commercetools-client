import React from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";
import classNames from "classnames";

export const CreditCardButton: React.FC<{
  fullWidth?: boolean;
  buttonText?: string;
}> = ({ fullWidth = true, buttonText }) => {
  const { handleGetClientToken, clientToken } = usePayment();

  return clientToken || false ? (
    <CreditCardMask fullWidth={fullWidth} buttonText={buttonText} />
  ) : (
    <button
      className={classNames({
        "justify-center align-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600  shadow-sm":
          true,
        "w-full": fullWidth,
      })}
      onClick={handleGetClientToken}
    >
      Pay
    </button>
  );
};
