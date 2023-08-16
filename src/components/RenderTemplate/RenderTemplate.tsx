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
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  taxAmount,
  shippingAmount,
  discountAmount,
  shippingMethodId,
}) => {
  return (
    <NotificationsProvider>
      <LoaderProvider>
        <PaymentProvider
          getClientTokenUrl={getClientTokenUrl}
          createPaymentUrl={createPaymentUrl}
          purchaseUrl={purchaseUrl}
          sessionKey={sessionKey}
          sessionValue={sessionValue}
          purchaseCallback={purchaseCallback}
          cartInformation={cartInformation}
          taxAmount={taxAmount}
          shippingAmount={shippingAmount}
          discountAmount={discountAmount}
          shippingMethodId={shippingMethodId}
        >
          <RenderPurchase>{children}</RenderPurchase>
        </PaymentProvider>
      </LoaderProvider>
    </NotificationsProvider>
  );
};
