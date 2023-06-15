import { useEffect } from "react";
import { usePayment } from "./usePayment";

export const useHandleGetClientToken = (disabled: boolean) => {
  const { handleGetClientToken } = usePayment();

  useEffect(() => {
    if (disabled) return;

    handleGetClientToken();
  }, [disabled]);
};
