import React, { useEffect } from "react";
import { usePayment } from "../../app/usePayment";

export const PayPalMask: React.FC<
  React.PropsWithChildren<{
    fullWidth?: boolean;
    buttonText: string;
  }>
> = ({ fullWidth = true, buttonText }) => {
  const { handlePurchase, paymentInfo } = usePayment();

  useEffect(() => {}, []);

  return <div>PayPal Mask</div>;
};
