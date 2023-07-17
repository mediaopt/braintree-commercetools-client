import React, { useEffect, useRef, useState } from "react";
import {
  client as braintreeClient,
  localPayment,
  LocalPayment,
} from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";

import { LocalPaymentMethodsType, GeneralPayButtonProps } from "../../types";
import { useLoader } from "../../app/useLoader";
import { renderMaskButtonClasses } from "../../styles";

type LocalPaymentMethodMaskType = LocalPaymentMethodsType &
  GeneralPayButtonProps;

export const LocalPaymentMethodMask: React.FC<
  React.PropsWithChildren<LocalPaymentMethodMaskType>
> = ({
  paymentType,
  countryCode,
  currencyCode,
  fullWidth = true,
  buttonText,
  merchantAccountId,
  fallbackUrl,
  fallbackButtonText,
}: LocalPaymentMethodMaskType) => {
  const [localPaymentInstance, setLocalPaymentInstance] =
    useState<LocalPayment>();

  const paymentButton = useRef<HTMLButtonElement>(null);

  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  const invokePayment = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!localPaymentInstance) {
      notify("Error", "No payment instance");
      return;
    }
    isLoading(true);
    localPaymentInstance.startPayment(
      {
        paymentType: paymentType,
        amount: paymentInfo.amount,
        fallback: {
          url: fallbackUrl,
          buttonText: fallbackButtonText,
        },
        email: "",
        paymentTypeCountryCode: countryCode,
        currencyCode: currencyCode,
        address: {
          countryCode: countryCode,
        },
        onPaymentStart: function (data, start) {
          //@todo we have to store the data.paymentId somewhere (on the server); BT recommends to map it to a cart identifier
          start();
        },
      },
      function (startPaymentError, payload) {
        if (startPaymentError) {
          if (startPaymentError.code === "LOCAL_PAYMENT_POPUP_CLOSED") {
            notify("Error", "Customer closed Local Payment popup.");
          } else {
            notify("Error", startPaymentError.message);
          }
        } else {
          if (payload) {
            handlePurchase(payload.nonce);
          } else {
            notify("Error", "No payload received");
          }
        }
        isLoading(false);
      }
    );
  };

  useEffect(() => {
    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientError, clientInstance) {
        isLoading(true);
        if (clientError) {
          isLoading(false);
          notify("Error", clientError.message);
          return;
        }
        localPayment.create(
          { client: clientInstance, authorization: clientToken }, //@todo docs mention using merchant id in case you need different merchants for different currencies
          function (localPaymentError, paymentInstance) {
            if (localPaymentError) {
              isLoading(false);
              notify("Error", localPaymentError.message);
              return;
            }
            setLocalPaymentInstance(paymentInstance);
            isLoading(false);
          }
        );
      }
    );
  }, [clientToken, merchantAccountId]);

  return (
    <>
      <button
        onClick={invokePayment}
        ref={paymentButton}
        className={renderMaskButtonClasses(
          fullWidth,
          !!localPaymentInstance,
          !localPaymentInstance
        )}
      >
        {buttonText}
      </button>
    </>
  );
};