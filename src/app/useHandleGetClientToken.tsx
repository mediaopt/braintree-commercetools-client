import { useEffect } from "react";
import { usePayment } from "./usePayment";

export const useHandleGetClientToken = (
  disabled: boolean,
  merchantAccountId?: string,
  fakePayment?: boolean
) => {
  const { handleGetClientToken } = usePayment();

  useEffect(() => {
    if (disabled) return;

    handleGetClientToken(merchantAccountId, fakePayment);
  }, [disabled]);
};
