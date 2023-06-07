import React, { useEffect } from "react";
import { client as braintreeClient, paypalCheckout } from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";

export const PayPalMask: React.FC<
  React.PropsWithChildren<{
    fullWidth?: boolean;
    buttonText: string;
    flow: string;
  }>
> = ({ flow }) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  useEffect(() => {
    isLoading(true);
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
              },
              function () {
                const paypal = global.paypal;

                paypal
                  .Buttons({
                    fundingSource: paypal.FUNDING.PAYPAL.toString(),

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
                isLoading(false);
              }
            );
          }
        );
      }
    );
  }, [paymentInfo, clientToken]);

  return <div id="paypal-button"></div>;
};
