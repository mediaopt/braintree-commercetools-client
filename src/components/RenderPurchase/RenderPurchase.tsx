import { FC } from "react";

import { usePayment } from "../../app/usePayment";

export const RenderPurchase: FC<React.PropsWithChildren> = ({ children }) => {
  const { errorMessage } = usePayment();

  return errorMessage ? <span>{errorMessage}</span> : <>{children}</>;
};
