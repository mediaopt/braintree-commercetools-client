import { useEffect } from "react";
import { usePayment } from "./usePayment";

export const useHandleGetClientToken = (
  disabled: boolean,
  merchantAccountId?: string,
  shippingMethodId?: string,
) => {
  const { handleGetClientToken } = usePayment();

  useEffect(() => {
    if (disabled) return;

    handleGetClientToken(merchantAccountId);
  }, [disabled, shippingMethodId]);
};
