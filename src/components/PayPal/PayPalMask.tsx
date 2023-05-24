import React, { useEffect } from "react";
import { client as braintreeClient, paypalCheckout } from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";

export const PayPalMask: React.FC<
  React.PropsWithChildren<{
    fullWidth?: boolean;
    buttonText: string;
    flow: string;
  }>
> = ({ flow }) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();

  useEffect(() => {
    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        if (clientErr) {
          notify("Error", "Error creating client.");
          return;
        }

        paypalCheckout.create(
          {
            client: clientInstance,
          },
          function (paypalCheckoutErr, paypalCheckoutInstance) {
            if (paypalCheckoutErr) {
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
                const shippingInformation =
                  paymentInfo.cartInformation.shipping;

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
                        shippingAddressOverride: {
                          recipientName: `${shippingInformation.firstName} ${shippingInformation.lastName}`,
                          line1: `${shippingInformation.streetName} ${shippingInformation.streetNumber}`,
                          line2: "",
                          city: shippingInformation.city,
                          countryCode: shippingInformation.country,
                          postalCode: shippingInformation.postalCode,
                          state: "",
                          phone: "",
                        },
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
              }
            );
          }
        );
      }
    );
  }, [paymentInfo, clientToken]);

  return <div id="paypal-button"></div>;
};
