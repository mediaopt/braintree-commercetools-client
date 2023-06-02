import React, { useEffect, useState } from "react";
import { client as braintreeClient, googlePayment } from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import useScript from "../../app/useScript";

export const GooglePayMask: React.FC<
  React.PropsWithChildren<{
    fullWidth?: boolean;
    buttonText: string;
  }>
> = ({}) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const [googlePayLoaded, setGooglePayLoaded] = useState(false);

  const gPayButton = React.useRef<HTMLDivElement>(null);

  useScript("https://pay.google.com/gp/p/js/pay.js", () =>
    setGooglePayLoaded(true)
  );
  useEffect(() => {
    if (!googlePayLoaded) {
      console.log("not loaded");
      return;
    }
    console.log("loaded");
    // Make sure to have https://pay.google.com/gp/p/js/pay.js loaded on your page

    // You will need a button element on your page styled according to Google's brand guidelines
    // https://developers.google.com/pay/api/web/guides/brand-guidelines
    var button = document.querySelector("#google-pay-button");
    var paymentsClient = new google.payments.api.PaymentsClient({
      environment: "TEST", // Or 'PRODUCTION'
    });

    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        googlePayment.create(
          {
            client: clientInstance,
            googlePayVersion: 2,
            googleMerchantId: "merchant-id-from-google", // Optional in sandbox; if set in sandbox, this value must be a valid production Google Merchant ID
          },
          function (googlePaymentErr, googlePaymentInstance) {
            paymentsClient
              .isReadyToPay({
                // see https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods:
                  googlePaymentInstance.createPaymentDataRequest()
                    .allowedPaymentMethods,
                existingPaymentMethodRequired: true, // Optional
              })
              .then(function (response) {
                if (response.result) {
                  if (!gPayButton.current) return;
                  gPayButton.current.addEventListener(
                    "click",
                    function (event) {
                      event.preventDefault();

                      var paymentDataRequest =
                        googlePaymentInstance.createPaymentDataRequest({
                          transactionInfo: {
                            currencyCode: "USD",
                            totalPriceStatus: "FINAL",
                            totalPrice: "100.00", // Your amount
                          },
                        });

                      // We recommend collecting billing address information, at minimum
                      // billing postal code, and passing that billing postal code with all
                      // Google Pay card transactions as a best practice.
                      // See all available options at https://developers.google.com/pay/api/web/reference/object
                      var cardPaymentMethod =
                        paymentDataRequest.allowedPaymentMethods[0];
                      cardPaymentMethod.parameters.billingAddressRequired =
                        true;
                      cardPaymentMethod.parameters.billingAddressParameters = {
                        format: "FULL",
                        phoneNumberRequired: true,
                      };

                      paymentsClient
                        .loadPaymentData(paymentDataRequest)
                        .then(function (paymentData) {
                          googlePaymentInstance.parseResponse(
                            paymentData,
                            function (err: any, result: any) {
                              if (err) {
                                // Handle parsing error
                              }

                              // Send result.nonce to your server
                              // result.type may be either "AndroidPayCard" or "PayPalAccount", and
                              // paymentData will contain the billingAddress for card payments
                            }
                          );
                        })
                        .catch(function (err) {
                          // Handle errors
                        });
                    }
                  );
                }
              })
              .catch(function (err) {
                // Handle errors
              });
          }
        );

        // Set up other Braintree components
      }
    );
  }, [paymentInfo, clientToken, googlePayLoaded]);

  return <div ref={gPayButton} id="gPay-button"></div>;
};
