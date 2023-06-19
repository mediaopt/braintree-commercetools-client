import React, { useEffect, useState } from "react";

import { useNotifications } from "../../app/useNotifications";
import { usePayment } from "../../app/usePayment";
import { PayButtonProps } from "../PayButton";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { ApllePayTypes } from "../../types";

import { ApplePayMask } from "./ApplePayMask";

declare const window: any;

type ApplePayButtonProps = ApllePayTypes & PayButtonProps;

export const ApplePayButton: React.FC<ApplePayButtonProps> = ({
  disabled,
  fullWidth = true,
  apllePayDisplayName,
}: ApplePayButtonProps) => {
  const [applyPaySupport, setApplyPaySupport] = useState(false);
  const { clientToken } = usePayment();

  const { notify } = useNotifications();

  useEffect(() => {
    try {
      if (!("ApplePaySession" in window)) {
        throw new Error("ApplePaySession");
      } else {
        if (window.ApplePaySession.canMakePayments()) {
          setApplyPaySupport(true);
        }
      }
    } catch (err) {
      notify("Error", `This device does not support Apple Pay${", " + err} `);
    }
  }, []);

  useHandleGetClientToken(disabled);
  return clientToken && applyPaySupport ? (
    <ApplePayMask
      fullWidth={fullWidth}
      apllePayDisplayName={apllePayDisplayName}
    />
  ) : (
    <></>
  );
};