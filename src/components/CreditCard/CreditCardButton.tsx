import React from "react";

import { usePayment } from "../../app/usePayment";
import { CreditCardMask } from "./CreditCardMask";
import classNames from "classnames";

const PAY_BUTTON_TEXT_FALLBACK = "Purchase";

export const CreditCardButton: React.FC<{
  disabled: boolean;
  fullWidth?: boolean;
  buttonText?: string;
  showPostalCode: boolean;
}> = ({
    disabled,
  fullWidth = true,
  buttonText = PAY_BUTTON_TEXT_FALLBACK,
  showPostalCode,
}) => {
  const { handleGetClientToken, clientToken } = usePayment();

  return clientToken ? (
    <CreditCardMask
      fullWidth={fullWidth}
      buttonText={buttonText}
      showPostalCode={showPostalCode}
    />
  ) : (
    <button
      className={classNames({
        "justify-center align-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600  shadow-sm":
          true,
        "w-full": fullWidth,
      })}
      onClick={handleGetClientToken}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
