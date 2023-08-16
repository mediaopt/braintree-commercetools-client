import { FC } from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { LoaderProvider } from "../../app/useLoader";
import { RenderPurchase } from "../RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const RenderTemplate: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  getClientTokenUrl,
  createPaymentUrl,
  createFakePaymentUrl,
  purchaseUrl,
  vaultPaymentMethodUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
}) => {
  return (
    <NotificationsProvider>
      <LoaderProvider>
        <PaymentProvider
          getClientTokenUrl={getClientTokenUrl}
          createPaymentUrl={createPaymentUrl}
          createFakePaymentUrl={createFakePaymentUrl}
          purchaseUrl={purchaseUrl}
          vaultPaymentMethodUrl={vaultPaymentMethodUrl}
          sessionKey={sessionKey}
          sessionValue={sessionValue}
          purchaseCallback={purchaseCallback}
          cartInformation={cartInformation}
        >
          <RenderPurchase>{children}</RenderPurchase>
        </PaymentProvider>
      </LoaderProvider>
    </NotificationsProvider>
  );
};
