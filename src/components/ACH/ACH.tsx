import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { isPayButtonDisabled } from "../PayButton";

import { ACHButton } from "./ACHButton";

import { GeneralComponentsProps, GeneralACHProps } from "../../types";

type ACHProps = GeneralComponentsProps & GeneralACHProps;

export const ACH: React.FC<ACHProps> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  fullWidth,
  buttonText,
  mandateText,
  getAchVaultTokenURL,
  useKount,
  lineItems,
  shipping,
  taxAmount,
  shippingAmount,
  discountAmount,
  shippingMethodId,
}: ACHProps) => {
  return (
    <RenderTemplate
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
      <ACHButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        cartInformation={cartInformation}
        mandateText={mandateText}
        getAchVaultTokenURL={getAchVaultTokenURL}
        useKount={useKount}
        lineItems={lineItems}
        shipping={shipping}
        shippingMethodId={shippingMethodId}
      />
    </RenderTemplate>
  );
};
