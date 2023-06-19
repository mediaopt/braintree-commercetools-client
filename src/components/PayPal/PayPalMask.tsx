import React, { useEffect } from "react";
import { client as braintreeClient, paypalCheckout } from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";

import {
  PayPalProps,
  GeneralPayButtonProps,
  PayPalFundingSourcesProp,
} from "../../types";

type PayPalMaskProps = GeneralPayButtonProps & PayPalProps;

const FUNDING_SOURCES = ["paypal"];

export const PayPalMask: React.FC<React.PropsWithChildren<PayPalMaskProps>> = ({
  flow,
  buttonLabel,
  buttonColor,
  payLater,
  payLaterButtonColor,
}) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  useEffect(() => {
    isLoading(true);
    const additionalFundingSources: PayPalFundingSourcesProp = {};
    if (payLater) {
      additionalFundingSources["paylater"] = {
        buttonColor: payLaterButtonColor,
      };
    }
    const additionalFundingMethods = Object.keys(
      additionalFundingSources ?? {}
    );
    FUNDING_SOURCES.push(...additionalFundingMethods);
    const enableFunding = additionalFundingMethods.length
      ? {
          "enable-funding": additionalFundingMethods.toString(),
        }
      : {};

    const fundingButtonConfigs: PayPalFundingSourcesProp = {
      paypal: {
        buttonColor: buttonColor,
        buttonLabel: buttonLabel,
      },
      ...(additionalFundingSources ?? {}),
    };

    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        if (clientErr) {
          isLoading(false);
          notify("Error", "Error creating client.");
          return;
        }

        paypalCheckout.create(
          {
            client: clientInstance,
          },
          function (paypalCheckoutErr, paypalCheckoutInstance) {
            if (paypalCheckoutErr) {
              isLoading(false);
              notify("Error", "Error in paypal checkout.");
              return;
            }

            paypalCheckoutInstance.loadPayPalSDK(
              {
                currency: paymentInfo.currency,
                intent: "capture",
                ...enableFunding,
              },
              function () {
                const paypal = global.paypal;

                FUNDING_SOURCES.forEach((fundingSource) => {
                  paypal
                    .Buttons({
                      style: {
                        label: fundingButtonConfigs[fundingSource].buttonLabel,
                        color: fundingButtonConfigs[fundingSource].buttonColor,
                      },
                      fundingSource: fundingSource,
                      createOrder: function () {
                        return paypalCheckoutInstance.createPayment({
                          flow: flow,

                          amount: paymentInfo.amount,
                          currency: paymentInfo.currency,

                          intent: "capture",

                          enableShippingAddress: true,
                          shippingAddressEditable: false,
                        });
                      },

                      onApprove: function (data: any, actions: any) {
                        return paypalCheckoutInstance.tokenizePayment(
                          data,
                          function (err: any, payload: any) {
                            handlePurchase(payload.nonce);
                          }
                        );
                      },

                      onCancel: function (data) {
                        notify("Info", "PayPal payment cancelled.");
                      },

                      onError: function (err) {
                        notify("Info", "PayPal payment cancelled.");
                      },
                    })
                    .render("#paypal-button");
                });

                isLoading(false);
              }
            );
          }
        );
      }
    );
  }, [
    paymentInfo,
    clientToken,
    buttonColor,
    buttonLabel,
    flow,
    notify,
    payLater,
    payLaterButtonColor,
  ]);

  return <div id="paypal-button"></div>;
};
