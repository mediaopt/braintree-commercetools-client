import { FC } from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { RenderPurchase } from "../../components/RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const RenderTemplate: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  getClientTokenUrl,
  createPaymentUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
}) => {
  return (
    <NotificationsProvider>
      <PaymentProvider
        getClientTokenUrl={getClientTokenUrl}
        createPaymentUrl={createPaymentUrl}
        purchaseUrl={purchaseUrl}
        sessionKey={sessionKey}
        sessionValue={sessionValue}
        purchaseCallback={purchaseCallback}
        cartInformation={cartInformation}
      >
        <RenderPurchase>{children}</RenderPurchase>
      </PaymentProvider>
    </NotificationsProvider>
  );
};
