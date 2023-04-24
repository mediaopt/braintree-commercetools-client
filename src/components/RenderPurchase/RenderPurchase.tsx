import { FC } from "react";

import { useToken } from "../../app/useToken";

export const RenderPurchase: FC<React.PropsWithChildren> = ({ children }) => {
  const { clientToken } = useToken();

  return clientToken ? (
    <>{children}</>
  ) : (
    <span>There is no client token to process</span>
  );
};
