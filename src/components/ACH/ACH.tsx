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
    >
      <ACHButton
        disabled={isPayButtonDisabled(cartInformation)}
        buttonText={buttonText}
        fullWidth={fullWidth}
        cartInformation={cartInformation}
        mandateText={mandateText}
        getAchVaultTokenURL={getAchVaultTokenURL}
      />
    </RenderTemplate>
  );
};
